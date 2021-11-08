import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import pool from '../utils/database/databasePool.js';
import { getCampaigns, getTextsInCampaign } from '../utils/database/queries.js';
import generateSendDate from '../utils/scheduledTexts/generateSendDate.js';

const campaignsRouter = express.Router();

// @route POST /api/campaigns
// @desc Create a new campaign
// @access
campaignsRouter.post('/', authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const { campaignName } = req.body;

    const newCampaign = await pool.query(`
      INSERT INTO campaigns (user_id, campaign_name) 
      VALUES ($1, $2)
      RETURNING *
    `, [id, campaignName]);

    res.status(200).json(newCampaign.rows[0]);
  } catch (error) {
    console.error(error);
  };
});

// @route GET /api/campaigns
// @desc Get all campaigns associated with a specific user
// @access
campaignsRouter.get('/', authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;

    const campaigns = await getCampaigns(id);

    res.status(200).json(campaigns.rows);
  } catch (error) {
    console.error(error);
  };
});

// @route POST /api/campaigns/:campaignId/add-text
// @desc Add a text to a specific campaign
// @access
campaignsRouter.post('/:campaignId/add-text', authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const { campaignId } = req.params;
    const {
      content,
      sendDay,
      sendHour,
      sendMinute
    } = req.body;

    const newCampaign = await pool.query(`
      INSERT INTO texts (user_id, campaign_id, content, send_day, send_hour, send_minute) 
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [id, campaignId, content, sendDay, sendHour, sendMinute]);

    res.status(200).json(newCampaign.rows[0]);
  } catch (error) {
    console.error(error);
  };
});

// @route GET /api/campaigns/:campaignId
// @desc Get all texts in a specific campaign
// @access
campaignsRouter.get('/:campaignId', authMiddleware, async (req, res) => {
  try {
    const { campaignId } = req.params;

    const textsInCampaign = await getTextsInCampaign(campaignId)

    res.status(200).json(textsInCampaign.rows);
  } catch (error) {
    console.error(error);
  };
});

// @route POST /api/campaigns/:campaignId/enroll
// @desc Enrolls array of contacts in a campaign
// @access
campaignsRouter.post('/:campaignId/enroll', async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { contactsToEnroll } = req.body;

    let textsInCampaign = await getTextsInCampaign(campaignId);
    textsInCampaign = textsInCampaign.rows;

    // TODO: It might be worthwhile to extract this into a function that can be tested independently
    contactsToEnroll.forEach(async (contact) => {
      const { contactId, timeZone } = contact;

      for (const text of textsInCampaign) {
        const { id: textId } = text;

        const sendDate = generateSendDate(text, timeZone);

        await pool.query(`
          INSERT INTO scheduled_texts (contact_id, text_id, send_date) 
          VALUES ($1, $2, $3)
          RETURNING *
        `, [contactId, textId, sendDate]);
      };
    });

    res.status(200).json({ response: 'Contacts enrolled!' });
  } catch (error) {
    console.error(error);
  };
});

// @route PUT /api/campaigns/:campaignId
// @desc
// @access
campaignsRouter.put('/:campaignId', authMiddleware, async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { campaignName } = req.body;

    const campaign = await pool.query(`
      UPDATE campaigns 
      SET campaign_name = $1 
      WHERE id = $2 
      RETURNING *
    `, [campaignName, campaignId]);

    res.status(200).json(campaign.rows[0]);
  } catch (error) {
    console.error(error);
  };
});

// @route DELETE /api/campaigns/:campaignId
// @desc
// @access
campaignsRouter.delete('/:campaignId', async (req, res) => {
  try {
    const { campaignId } = req.params;

    const deletedCampaign = await pool.query(`
      DELETE FROM campaigns 
      WHERE id = $1 
      RETURNING *
    `, [campaignId]);

    res.status(200).json(deletedCampaign.rows[0]);
  } catch (error) {
    console.error(error);
  };
});

export default campaignsRouter;
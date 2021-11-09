import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import enrollContacts from '../utils/scheduledTexts/enrollContacts.js';
import {
  deleteCampaign,
  getCampaigns,
  getTextsInCampaign,
  insertNewCampaign,
  insertNewText,
  updateCampaign
} from '../database/queries/campaignsQueries.js';

const campaignsRouter = express.Router();

// @route POST /api/campaigns
// @desc Create a new campaign
// @access PRIVATE
campaignsRouter.post('/', authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const { campaignName } = req.body;

    const newCampaign = await insertNewCampaign(id, campaignName);

    res.status(200).json(newCampaign);
  } catch (error) {
    console.error(error);
  };
});

// @route GET /api/campaigns
// @desc Get all campaigns associated with a specific user
// @access PRIVATE
campaignsRouter.get('/', authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;

    const campaigns = await getCampaigns(id);

    res.status(200).json(campaigns);
  } catch (error) {
    console.error(error);
  };
});

// @route POST /api/campaigns/:campaignId/add-text
// @desc Add a text to a specific campaign
// @access PRIVATE
campaignsRouter.post('/:campaignId/add-text', authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const { campaignId } = req.params;

    const newText = await insertNewText(req.body, id, campaignId);

    res.status(200).json(newText);
  } catch (error) {
    console.error(error);
  };
});

// @route GET /api/campaigns/:campaignId
// @desc Get all texts in a specific campaign
// @access PRIVATE
campaignsRouter.get('/:campaignId', authMiddleware, async (req, res) => {
  try {
    const { campaignId } = req.params;

    const textsInCampaign = await getTextsInCampaign(campaignId)

    res.status(200).json(textsInCampaign);
  } catch (error) {
    console.error(error);
  };
});

// @route POST /api/campaigns/:campaignId/enroll
// @desc Enrolls array of contacts in a campaign
// @access PRIVATE
campaignsRouter.post('/:campaignId/enroll', authMiddleware, async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { contactsToEnroll } = req.body;

    let textsInCampaign = await getTextsInCampaign(campaignId);

    enrollContacts(contactsToEnroll, textsInCampaign);

    res.status(200).json({ response: 'Contacts enrolled!' });
  } catch (error) {
    console.error(error);
  };
});

// @route PUT /api/campaigns/:campaignId
// @desc
// @access PRIVATE
campaignsRouter.put('/:campaignId', authMiddleware, async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { campaignName } = req.body;

    const campaign = await updateCampaign(campaignName, campaignId);

    res.status(200).json(campaign);
  } catch (error) {
    console.error(error);
  };
});

// @route DELETE /api/campaigns/:campaignId
// @desc
// @access PRIVATE
campaignsRouter.delete('/:campaignId', authMiddleware, async (req, res) => {
  try {
    const { campaignId } = req.params;

    const deletedCampaign = await deleteCampaign(campaignId);

    res.status(200).json(deletedCampaign);
  } catch (error) {
    console.error(error);
  };
});

export default campaignsRouter;
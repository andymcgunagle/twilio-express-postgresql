import pool from '../databasePool.js';

export const getTextsInCampaign = async (campaignId) => {
  return await pool.query(`
    SELECT * 
    FROM texts 
    WHERE campaign_id = $1
  `, [campaignId]);
};

export const getCampaigns = async (userId) => {
  return await pool.query(`
    SELECT * 
    FROM campaigns 
    WHERE user_id = $1
  `, [userId]);
};

export const selectContact = async (contactId) => {
  return await pool.query(`
    SELECT first_name, phone_number 
    FROM contacts 
    WHERE id = $1
  `, [contactId]);
};

export const getTextContent = async (textId) => {
  return await pool.query(`
    SELECT content 
    FROM texts 
    WHERE id = $1
  `, [textId]);
};

export const getScheduledTexts = async (currentDate) => {
  return await pool.query(`
    SELECT *
    FROM scheduled_texts
    WHERE send_date = $1;
  `, [currentDate]);
};

export const insertScheduledTexts = async (contactId, textId, sendDate) => {
  return await pool.query(`
    INSERT INTO scheduled_texts (contact_id, text_id, send_date) 
    VALUES ($1, $2, $3)
    RETURNING *
  `, [contactId, textId, sendDate]);
};

export const insertNewCampaign = async (id, campaignName) => {
  return await pool.query(`
    INSERT INTO campaigns (user_id, campaign_name) 
    VALUES ($1, $2)
    RETURNING *
`, [id, campaignName]);
};

export const insertNewText = async (reqBody, id, campaignId) => {
  const {
    content,
    sendDay,
    sendHour,
    sendMinute
  } = reqBody;

  return await pool.query(`
  INSERT INTO texts (user_id, campaign_id, content, send_day, send_hour, send_minute) 
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
  `, [id, campaignId, content, sendDay, sendHour, sendMinute]);
};

export const updateCampaign = async (campaignName, campaignId) => {
  return await pool.query(`
    UPDATE campaigns 
    SET campaign_name = $1 
    WHERE id = $2 
    RETURNING *
  `, [campaignName, campaignId]);
};

export const deleteCampaign = async (campaignId) => {
  return await pool.query(`
    DELETE FROM campaigns 
    WHERE id = $1 
    RETURNING *
  `, [campaignId]);
};
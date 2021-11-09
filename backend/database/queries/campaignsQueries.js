import pool from '../databasePool.js';

export const getTextsInCampaign = async (campaignId) => {
  const result = await pool.query(`
    SELECT * 
    FROM texts 
    WHERE campaign_id = $1
  `, [campaignId]);

  return result.rows;
};

export const getCampaigns = async (userId) => {
  const result = await pool.query(`
    SELECT * 
    FROM campaigns 
    WHERE user_id = $1
  `, [userId]);

  return result.rows;
};

export const selectContact = async (contactId) => {
  const result = await pool.query(`
    SELECT first_name, phone_number 
    FROM contacts 
    WHERE id = $1
  `, [contactId]);

  return {
    firstName: result.rows[0].first_name,
    phoneNumber: result.rows[0].phone_number
  };
};

export const getTextContent = async (textId) => {
  const result = await pool.query(`
    SELECT content 
    FROM texts 
    WHERE id = $1
  `, [textId]);

  return result.rows[0].content;
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
  const result = await pool.query(`
    INSERT INTO campaigns (user_id, campaign_name) 
    VALUES ($1, $2)
    RETURNING *
`, [id, campaignName]);

  return result.rows[0];
};

export const insertNewText = async (reqBody, id, campaignId) => {
  const {
    content,
    sendDay,
    sendHour,
    sendMinute
  } = reqBody;

  const result = await pool.query(`
  INSERT INTO texts (user_id, campaign_id, content, send_day, send_hour, send_minute) 
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
  `, [id, campaignId, content, sendDay, sendHour, sendMinute]);

  return result.rows[0];
};

export const updateCampaign = async (campaignName, campaignId) => {
  const result = await pool.query(`
    UPDATE campaigns 
    SET campaign_name = $1 
    WHERE id = $2 
    RETURNING *
  `, [campaignName, campaignId]);

  return result.rows[0];
};

export const deleteCampaign = async (campaignId) => {
  const result = await pool.query(`
    DELETE FROM campaigns 
    WHERE id = $1 
    RETURNING *
  `, [campaignId]);

  return result.rows[0];
};
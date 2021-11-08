import pool from './databasePool.js';

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

export const getContactPhoneNumber = async (contactId) => {
  return await pool.query(`
    SELECT phone_number 
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


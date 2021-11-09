import pool from "../databasePool.js";

export const insertNewContact = async (id, firstName, phoneNumber, timeZone) => {
  return await pool.query(`
    INSERT INTO contacts (user_id, first_name, phone_number, time_zone) 
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [id, firstName, phoneNumber, timeZone]);
};

export const selectAllContacts = async (id) => {
  return await pool.query(`
    SELECT *
    FROM contacts
    WHERE user_id = $1;
  `, [id]);
};

export const selectContact = async (contactId) => {
  return await pool.query(`
    SELECT *
    FROM contacts
    WHERE id = $1;
  `, [contactId]);
};
import pool from "../databasePool.js";

export const insertNewContact = async (id, firstName, phoneNumber, timeZone) => {
  const result = await pool.query(`
    INSERT INTO contacts (user_id, first_name, phone_number, time_zone) 
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [id, firstName, phoneNumber, timeZone]);

  return result.rows[0];
};

export const selectAllContacts = async (id) => {
  const result = await pool.query(`
    SELECT *
    FROM contacts
    WHERE user_id = $1;
  `, [id]);

  return result.rows;
};

export const selectContact = async (contactId) => {
  const result = await pool.query(`
    SELECT *
    FROM contacts
    WHERE id = $1;
  `, [contactId]);

  return result.rows[0];
};

export const selectContactTimeZone = async (contactId) => {
  const result = await pool.query(`
    SELECT time_zone
    FROM contacts
    WHERE id = $1;
  `, [contactId]);

  return result.rows[0].time_zone;
};
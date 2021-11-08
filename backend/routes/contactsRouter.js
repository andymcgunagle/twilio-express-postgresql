import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import pool from '../utils/database/databasePool.js';

const contactsRouter = express.Router();

// @route POST /api/contacts
// @desc Creates a new contact
// @access
contactsRouter.post('/', authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const { phoneNumber, timeZone } = req.body;

    const newContact = await pool.query(`
      INSERT INTO contacts (user_id, phone_number, time_zone) 
      VALUES ($1, $2, $3)
      RETURNING *
    `, [id, phoneNumber, timeZone]);

    res.status(200).send(newContact.rows[0]);
  } catch (error) {
    console.error(error);
  };
});

// @route GET /api/contacts
// @desc
// @access
contactsRouter.get('/', authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;

    const contacts = await pool.query(`
      SELECT *
      FROM contacts
      WHERE user_id = $1;
    `, [id]);

    res.status(200).send(contacts.rows);
  } catch (error) {
    console.error(error);
  };
});

// @route GET /api/contacts/:contactId
// @desc
// @access
contactsRouter.get('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;

    const contact = await pool.query(`
    SELECT *
    FROM contacts
    WHERE id = $1;
    `, [contactId]);

    res.status(200).send(contact.rows[0]);
  } catch (error) {
    console.error(error);
  };
});

// @route PUT /api/contacts/:contactId
// @desc
// @access
contactsRouter.put('/:contactId', (req, res) => {
  try {

  } catch (error) {
    console.error(error);
  };
});

// @route DELETE /api/:contactId
// @desc
// @access
contactsRouter.delete('/:contactId', (req, res) => {
  try {

  } catch (error) {
    console.error(error);
  };
});

export default contactsRouter;
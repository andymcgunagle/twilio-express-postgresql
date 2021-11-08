import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  insertNewContact,
  selectAllContacts,
  selectContact
} from '../database/queries/contactsQueries.js';

const contactsRouter = express.Router();

// @route POST /api/contacts
// @desc Creates a new contact
// @access
contactsRouter.post('/', authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const { phoneNumber, timeZone } = req.body;

    const newContact = await insertNewContact(id, phoneNumber, timeZone)

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

    const contacts = await selectAllContacts(id);

    res.status(200).send(contacts.rows);
  } catch (error) {
    console.error(error);
  };
});

// @route GET /api/contacts/:contactId
// @desc
// @access
contactsRouter.get('/:contactId', authMiddleware, async (req, res) => {
  try {
    const { contactId } = req.params;

    const contact = await selectContact(contactId);

    res.status(200).send(contact.rows[0]);
  } catch (error) {
    console.error(error);
  };
});

// @route PUT /api/contacts/:contactId
// @desc
// @access
contactsRouter.put('/:contactId', authMiddleware, (req, res) => {
  try {

  } catch (error) {
    console.error(error);
  };
});

// @route DELETE /api/:contactId
// @desc
// @access
contactsRouter.delete('/:contactId', authMiddleware, (req, res) => {
  try {

  } catch (error) {
    console.error(error);
  };
});

export default contactsRouter;
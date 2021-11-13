import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  deleteContact,
  insertNewContact,
  selectAllContacts,
  selectContact
} from '../database/queries/contactsQueries.js';

const contactsRouter = express.Router();

// @route POST /api/contacts
// @desc Creates a new contact
// @access PRIVATE
contactsRouter.post('/', authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const { firstName, phoneNumber, timeZone } = req.body;

    const newContact = await insertNewContact(id, firstName, phoneNumber, timeZone)

    res.status(200).send(newContact);
  } catch (error) {
    console.error(error);
  };
});

// @route GET /api/contacts
// @desc Gets all contacts associated with a specific user
// @access PRIVATE
contactsRouter.get('/', authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;

    const contacts = await selectAllContacts(id);

    res.status(200).send(contacts);
  } catch (error) {
    console.error(error);
  };
});

// @route GET /api/contacts/:contactId
// @desc Gets a specific contact
// @access PRIVATE
contactsRouter.get('/:contactId', authMiddleware, async (req, res) => {
  try {
    const { contactId } = req.params;

    const contact = await selectContact(contactId);

    res.status(200).send(contact);
  } catch (error) {
    console.error(error);
  };
});

// @route PUT /api/contacts/:contactId
// @desc
// @access PRIVATE
contactsRouter.put('/:contactId', authMiddleware, (req, res) => {
  try {

  } catch (error) {
    console.error(error);
  };
});

// @route DELETE /api/:contactId
// @desc
// @access PRIVATE
contactsRouter.delete('/:contactId', authMiddleware, (req, res) => {
  try {
    const { contactId } = req.params;

    const deletedContact = deleteContact(contactId);

    res.status(200).json(deletedContact);
  } catch (error) {
    console.error(error);
  };
});

export default contactsRouter;
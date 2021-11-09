import express from 'express';
import campaignsRouter from './campaignsRouter.js';
import contactsRouter from './contactsRouter.js';
import usersRouter from './usersRouter.js';

const router = express.Router();

router.use('/campaigns', campaignsRouter);
router.use('/contacts', contactsRouter);
router.use('/users', usersRouter);

export default router;
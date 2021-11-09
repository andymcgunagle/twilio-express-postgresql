import express from 'express';
import saltHashSignNewUser from '../utils/auth/saltHashSignNewUser.js';
import findCompareSignExistingUser from '../utils/auth/findCompareSignExistingUser.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const usersRouter = express.Router();

// @route POST /api/users/signup
// @desc Signs the user up
// @access PUBLIC 
usersRouter.post('/signup', (req, res) => {
  try {
    const { email, password } = req.body;
    saltHashSignNewUser(email, password, res);
  } catch (error) {
    console.error(error);
  };
});


// @route POST /api/users/login
// @desc Logs the user in
// @access PUBLIC
usersRouter.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    findCompareSignExistingUser(email, password, res);
  } catch (error) {
    console.error(error);
  };
});

// @route GET /api/users/current
// @desc Gets the id of the current user
// @access PRIVATE
usersRouter.get('/current', authMiddleware, (req, res) => {
  try {
    const { id } = req.user;
    res.status(200).json({ id });
  } catch (error) {
    console.error(error);
  };
});

// @route PUT /api/users/:id
// @desc
// @access PRIVATE
usersRouter.put('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;

  } catch (error) {
    console.error(error);
  };
});

// @route DELETE /api/users/:id
// @desc
// @access PRIVATE
usersRouter.delete('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;

  } catch (error) {
    console.error(error);
  };
});

export default usersRouter;
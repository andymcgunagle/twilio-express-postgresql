import express from 'express';
import saltHashSignNewUser from '../utils/auth/saltHashSignNewUser.js';
import findCompareSignExistingUser from '../utils/auth/findCompareSignExistingUser.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const usersRouter = express.Router();

// @route POST /api/users/signup
// @desc
// @access
usersRouter.post('/signup', (req, res) => {
  try {
    const { email, password } = req.body;
    saltHashSignNewUser(email, password, res);
  } catch (error) {
    console.error(error);
  };
});

// @route POST /api/users/login
// @desc
// @access
usersRouter.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    findCompareSignExistingUser(email, password, res);
  } catch (error) {
    console.error(error);
  };
});

// @route GET /api/users/current
// @desc
// @access
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
// @access
usersRouter.put('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;

  } catch (error) {
    console.error(error);
  };
});

// @route DELETE /api/users/:id
// @desc
// @access
usersRouter.delete('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;

  } catch (error) {
    console.error(error);
  };
});

export default usersRouter;
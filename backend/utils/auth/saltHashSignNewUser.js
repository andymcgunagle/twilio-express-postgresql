import jwt from 'jsonwebtoken';
import bcrpyt from 'bcryptjs';
import pool from '../database/databasePool.js';

const saltHashSignNewUser = async (inputEmail, inputPassword, res) => {
  try {
    const salt = await bcrpyt.genSalt(10);
    const hashedPassword = await bcrpyt.hash(inputPassword, salt);

    const user = await pool.query(`
      INSERT INTO users (email, hashed_password) 
      VALUES ($1, $2)
      RETURNING id, email
    `, [inputEmail, hashedPassword]);

    const { id, email } = user.rows[0];

    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 3600 });

    return res.status(200).json({ token: token, user: { id, email } });
  } catch (error) {
    return console.error(error);
  };
};

export default saltHashSignNewUser;
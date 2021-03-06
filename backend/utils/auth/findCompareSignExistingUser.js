import bcrpyt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { selectUser } from '../../database/queries/usersQueries.js';

const findCompareSignExistingUser = async (email, password, res) => {
  try {
    const existingUser = await selectUser(email);

    if (existingUser.rowCount === 0) return res.status(400).json({ msg: 'User does not exist.' });

    const { id, hashed_password: hashedPassword } = existingUser.rows[0];

    const isMatch = await bcrpyt.compare(password, hashedPassword);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 3600 });

    return res.status(200).json({ token, existingUser: { id, email, } });
  } catch (error) {
    console.error(`\nš in findCompareSignExistingUser: ${error}\n`);
  };
};

export default findCompareSignExistingUser;
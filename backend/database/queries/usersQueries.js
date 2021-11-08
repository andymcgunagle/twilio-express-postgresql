import pool from "../databasePool.js";

export const insertNewUser = async (inputEmail, hashedPassword) => {
  return await pool.query(`
    INSERT INTO users (email, hashed_password) 
    VALUES ($1, $2)
    RETURNING id, email
  `, [inputEmail, hashedPassword]);
};

export const selectUser = async (email) => {
  return await pool.query(`
    SELECT id, hashed_password  
    FROM users 
    WHERE email = ($1)
  `, [email]);
};
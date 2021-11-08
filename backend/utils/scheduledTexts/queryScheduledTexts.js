import pool from "../database/databasePool.js";
import sendScheduledTexts from "./sendScheduledTexts.js";

const queryScheduledTexts = async () => {
  try {
    const currentDate = new Date();

    let scheduledTexts = await pool.query(`
      SELECT *
      FROM scheduled_texts
      WHERE send_date = $1;
    `, [currentDate]);

    sendScheduledTexts(scheduledTexts.rows);
  } catch (error) {
    console.error(`\n🆘 in queryScheduledTexts: ${error} \n`);
  };
};

queryScheduledTexts();

export default queryScheduledTexts;
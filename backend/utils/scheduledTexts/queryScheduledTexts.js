import sendScheduledTexts from "./sendScheduledTexts.js";
import { setMilliseconds } from 'date-fns';
import { getScheduledTexts } from "../../database/queries/campaignsQueries.js";

const queryScheduledTexts = async () => {
  try {
    let currentDate = setMilliseconds(new Date(), 0);

    const scheduledTexts = await getScheduledTexts(currentDate.toISOString());

    if (scheduledTexts.rowCount !== 0) {
      sendScheduledTexts(scheduledTexts.rows);
    };
  } catch (error) {
    console.error(`\n🆘 in queryScheduledTexts: ${error} \n`);
  };
};

export default queryScheduledTexts;
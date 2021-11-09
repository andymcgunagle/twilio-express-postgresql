import Twilio from 'twilio';
import { selectContact, getTextContent } from '../../database/queries/campaignsQueries.js';

const sendScheduledTexts = (scheduledTexts) => {
  const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  scheduledTexts.forEach(async (scheduledText) => {
    const { contact_id, text_id } = scheduledText;

    const { firstName, phoneNumber } = await selectContact(contact_id);

    let textContent = await getTextContent(text_id);

    try {
      const message = await client.messages.create({
        to: `+${phoneNumber}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: `Hi ${firstName}! ${textContent}`,
        // PROD-TODO: The callback URL you specify must be public and reachable from Twilios services, otherwise this won't work.
        // statusCallback: `http://localhost:8080/some-endpoint`,
      });

      console.log(`\n📲 messageSid ${message.sid} to ${phoneNumber} has been ${message.status}`);
    } catch (error) {
      console.error(`\n🆘 in scheduledTexts.forEach: ${error}\n`);
    };
  });
};

export default sendScheduledTexts;
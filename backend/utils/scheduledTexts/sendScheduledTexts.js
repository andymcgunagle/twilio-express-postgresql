import Twilio from 'twilio';
import { getContactPhoneNumber, getTextContent } from '../../database/queries/campaignQueries.js';

const sendScheduledTexts = (scheduledTexts) => {
  const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  scheduledTexts.forEach(async (scheduledText) => {
    const { contact_id, text_id } = scheduledText;

    let phoneNumber = await getContactPhoneNumber(contact_id);
    phoneNumber = phoneNumber.rows[0].phone_number;

    let textContent = await getTextContent(text_id);
    textContent = textContent.rows[0].content;

    try {
      const message = await client.messages.create({
        to: `+${phoneNumber}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: `Hi! ${textContent}`,
        // body: `Hi ${contact.firstName}! ${text.content}`,
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
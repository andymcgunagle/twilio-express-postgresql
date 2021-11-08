import generateSendDate from './generateSendDate.js';
import { insertScheduledTexts } from '../../database/queries/campaignQueries.js';

const enrollContacts = (contactsToEnroll, textsInCampaign) => {
  contactsToEnroll.forEach(async (contact) => {
    const { contactId, timeZone } = contact;

    for (const text of textsInCampaign) {
      const { id: textId } = text;

      const sendDate = generateSendDate(text, timeZone);

      insertScheduledTexts(contactId, textId, sendDate);
    };
  });
};

export default enrollContacts;
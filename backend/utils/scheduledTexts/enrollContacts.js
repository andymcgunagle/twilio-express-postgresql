import generateSendDate from './generateSendDate.js';
import { insertScheduledTexts } from '../../database/queries/campaignsQueries.js';
import { selectContactTimeZone } from '../../database/queries/contactsQueries.js';

const enrollContacts = (contactsToEnroll, textsInCampaign) => {
  contactsToEnroll.forEach(async (contact) => {
    const { contactId } = contact;

    const timeZone = await selectContactTimeZone(contactId);

    for (const text of textsInCampaign) {
      const { id: textId } = text;

      const sendDate = generateSendDate(text, timeZone);

      insertScheduledTexts(contactId, textId, sendDate);
    };
  });
};

export default enrollContacts;
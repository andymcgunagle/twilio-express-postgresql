import {
  add,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  sub,
} from 'date-fns';

const generateSendDate = (text, timeZone) => {
  const {
    send_day: sendDay,
    send_hour: sendHour,
    send_minute: sendMinute
  } = text;
  let timeZoneOffset;

  // Get current date
  const currentDate = new Date();

  // Add days to current date
  let sendDate = add(currentDate, { days: sendDay });

  // Set the hour to be sent
  sendDate = setHours(new Date(sendDate), sendHour);

  // Set the minute to be sent
  sendDate = setMinutes(new Date(sendDate), sendMinute);

  // Set the seconds to be sent to zero
  sendDate = setSeconds(new Date(sendDate), 0);

  // Set the milliseconds to be sent to zero
  sendDate = setMilliseconds(new Date(sendDate), 0);

  // Set the time zone offset relative to PST 
  // POTENTIAL BUG: Assumes the server is on PST
  switch (timeZone) {
    case 'eastern':
      timeZoneOffset = 3;
      break;
    case 'central':
      timeZoneOffset = 2;
      break;
    case 'mountain':
      timeZoneOffset = 1;
      break;
    case 'pacific':
      timeZoneOffset = 0;
      break;
    case 'alaska':
      timeZoneOffset = -1;
      break;
    case 'hawaii':
      timeZoneOffset = -2;
      break;
  };

  // Subtract the time zone offset from the send date
  sendDate = sub(new Date(sendDate), { hours: timeZoneOffset });

  sendDate = sendDate.toISOString();

  return sendDate;
};

export default generateSendDate;
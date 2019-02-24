import moment from 'moment-timezone';

const getTimeZoneOffset = timeZone => {
  const now = moment();
  const localOffset = now.utcOffset();
  now.tz(timeZone);
  const otherOffset = now.utcOffset();
  return -(localOffset - otherOffset) / 60;
};

export default getTimeZoneOffset;

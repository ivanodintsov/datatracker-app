import { Chat } from '../../../models';
import moment from 'moment-timezone';

const notUpdatedChats = async (_, { days, limit }) => {
  const date = moment().startOf('day').add(-days, 'days');

  return await Chat.find({
    cron_updated_at: { $lte: date },
    is_active: true,
  }).limit(limit);
};

export default notUpdatedChats;

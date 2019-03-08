import moment from 'moment-timezone';
import { ChatDailyStatistics } from '../../../models';

const chatStatistics = async (_, { chat, range: [from, to] }) => {
  const stats = await ChatDailyStatistics.find({
    chat,
    date: { $gte : new Date(from), $lte: new Date(to) }
  });

  return stats;
};

export const chatStatistics4days = async (_, { chat }) => {
  const now = moment();
  const range = [now.clone().subtract(5, 'days'), now.clone().subtract(1, 'days')];
  return await chatStatistics(_, { chat, range });
};

export default chatStatistics;

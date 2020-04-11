import { getStatisticsHour } from '../../common/helpers/getStatisticsDate';
import ChatDailyStatistics from '../index';

const reputationService = async ({
  reputation,
  message,
}) => {
  const dates = getStatisticsHour(message.date);
  const hour = dates.quarter.hour()
  const repliedMessage = reputation.repliedMessage;

  await ChatDailyStatistics.changeReputation({
    chat: repliedMessage.chat,
    date: dates.date,
    type: reputation.reaction,
    hour,
  });
};

export default reputationService;

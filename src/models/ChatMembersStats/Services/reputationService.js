import { getStatisticsHour } from '../../common/helpers/getStatisticsDate';
import ChatMembersStats from '../index';

const reputationService = async ({
  reputation,
  message,
}) => {
  const repliedMessage = reputation.repliedMessage;
  const dates = getStatisticsHour(repliedMessage.date);

  await ChatMembersStats.changeReputation({
    chat: repliedMessage.chat,
    user: repliedMessage.from,
    type: reputation.reaction,
    date: dates.quarter,
  });
};

export default reputationService;

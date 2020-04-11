import { getStatisticsHour } from '../../common/helpers/getStatisticsDate';
import ChatMembersStats from '../index';

const reputationChangesService = async ({
  reputation,
  message,
}) => {
  const dates = getStatisticsHour(message.date);

  await ChatMembersStats.changeReputationChanges({
    chat: message.chat,
    user: message.from,
    type: reputation.reaction,
    date: dates.quarter,
  });
};

export default reputationChangesService;

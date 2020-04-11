import { getStatisticsHour } from '../../common/helpers/getStatisticsDate';
import ChatMembersStats from '../index';

const reputationService = async ({
  reputation,
  message,
}) => {
  const repliedMessage = reputation.repliedMessage;
  const reputationChanger = reputation.reaction.changer;
  const dates = getStatisticsHour(repliedMessage.date);

  await ChatMembersStats
    .where('from', repliedMessage.from)
    .where('chat', repliedMessage.chat)
    .where('date', dates.quarter)
    .updateOne({
      $inc: {
        reputation: reputationChanger,
      },
    });
};

export default reputationService;

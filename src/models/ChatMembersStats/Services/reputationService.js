import { getStatisticsHour } from '../../common/helpers/getStatisticsDate';
import ChatMembersStats from '../index';

const reputationService = async ({
  reputation,
  message,
}) => {
  const replyedMessage = reputation.replyedMessage;
  const reputationChanger = reputation.reaction.changer;
  const dates = getStatisticsHour(replyedMessage.date);

  await ChatMembersStats
    .where('from', replyedMessage.from)
    .where('chat', replyedMessage.chat)
    .where('date', dates.querter)
    .updateOne({
      $inc: {
        reputation: reputationChanger,
      },
    });
};

export default reputationService;

import { getStatisticsHour } from '../../common/helpers/getStatisticsDate';
import ChatDailyStatistics from '../index';

const reputationService = async ({
  reputation,
  message,
}) => {
  const dates = getStatisticsHour(message.date);
  const hour = dates.querter.hour()
  const reputationChanger = reputation.reaction.changer;
  const replyedMessage = reputation.replyedMessage;

  await ChatDailyStatistics
    .where('chat', replyedMessage.chat)
    .where('date', dates.date)
    .updateOne({
      $inc: {
        [`hours.${hour}.reputation`]: reputationChanger,
        reputation: reputationChanger,
      },
    });
};

export default reputationService;

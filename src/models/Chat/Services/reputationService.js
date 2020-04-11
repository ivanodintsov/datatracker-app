import Chat from '../index';

const reputationService = async ({
  reputation,
  message,
}) => {
  await Chat.changeReputation({
    chat: message.chat,
    type: reputation.reaction,
  });
};

export default reputationService;

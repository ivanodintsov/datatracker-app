import ChatMember from '../ChatMember';
import sameReplyMemberService from '../Services/sameReplyMemberService';

const getReactionItems = () => ({
  '+': {
    type: 'INCREASE'
  },
  '-': {
    type: 'DECREASE',
  }
});

const reputationService = async (message) => {
  const reaction = getReactionItems()[message.text];

  if (!reaction) {
    return;
  }

  const isSameMemberMessage = await sameReplyMemberService(message);

  if (isSameMemberMessage === true) {
    return;
  }

  await ChatMember.changeReputation({
    chat: isSameMemberMessage.chat,
    user: isSameMemberMessage.from,
    type: reaction.type,
  });
};

export default reputationService;

import sameReplyMemberService from '../Services/sameReplyMemberService';

const getReactionItems = () => ({
  '+': {
    type: 'INCREASE',
    changer: 1,
  },
  '-': {
    type: 'DECREASE',
    changer: -1,
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

  return {
    reaction,
    repliedMessage: isSameMemberMessage,
  };
};

export default reputationService;

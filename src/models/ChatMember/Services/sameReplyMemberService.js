import Message from '../../Message';

const sameReplyMemberService = async (message) => {
  if (!message.reply_to_message) {
    return true;
  }

  const replyedMessage = await Message.findOne({
    message_id: message.reply_to_message,
    chat: message.chat,
  });

  if (!replyedMessage) {
    return true;
  }

  if (message.from === replyedMessage.from) {
    return true;
  }

  return replyedMessage;
};

export default sameReplyMemberService;

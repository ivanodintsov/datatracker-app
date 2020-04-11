import Message from '../../Message';

const sameReplyMemberService = async (message) => {
  if (!message.reply_to_message) {
    return true;
  }

  const repliedMessage = await Message.findOne({
    message_id: message.reply_to_message,
    chat: message.chat,
  });

  if (!repliedMessage) {
    return true;
  }

  if (message.from === repliedMessage.from) {
    return true;
  }

  return repliedMessage;
};

export default sameReplyMemberService;

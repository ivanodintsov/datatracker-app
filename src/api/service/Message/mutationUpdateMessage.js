import { Message } from '../../../models';

const updateMessage = async (_, { chat, message_id, edit_date, input }) => {
  const msg = await Message.findOne({ chat, message_id, edit_date });

  if (msg) {
    return 'NOT_UPDATED';
  }

  const query = edit_date
    ? { chat, message_id, edit_date: { $ne: edit_date } }
    : { chat, message_id };

  const update = edit_date
    ? { ...input, edit_date }
    : input;

  const { nModified } = await Message.updateOne(query, update);

  return new Boolean(nModified) ? 'UPDATED' : 'NOT_EXISTS';
};

export default updateMessage;

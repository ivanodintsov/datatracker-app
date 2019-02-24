import mongoose from 'mongoose';
import MessageSchema from './schema';

const Message = mongoose.model('message', MessageSchema);

export default Message;

import mongoose from 'mongoose';
import { ChatQuarterSchema } from './schema';

const ChatQuarterStatistics = mongoose.model('quarter_chat_statistics', ChatQuarterSchema);

export default ChatQuarterStatistics;

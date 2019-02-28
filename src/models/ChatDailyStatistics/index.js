import mongoose from 'mongoose';
import { ChatDailyStatisticsSchema } from './schema';

const ChatDailyStatistics = mongoose.model('daily_chat_statistics', ChatDailyStatisticsSchema);

export default ChatDailyStatistics;

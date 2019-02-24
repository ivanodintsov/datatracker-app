import mongoose from 'mongoose';
import ChatStatsSchema from './schema';

const ChatStats = mongoose.model('chat_stats', ChatStatsSchema);

export default ChatStats;

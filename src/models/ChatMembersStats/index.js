import mongoose from 'mongoose';
import ChatMembersStatsSchema from './schema';

const ChatMembersStats = mongoose.model('chat_members_stats', ChatMembersStatsSchema);

export default ChatMembersStats;

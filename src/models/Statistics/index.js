import mongoose from 'mongoose';
import { ChatDailySchema } from './schema';

export const ChatDaily = mongoose.model('daily_chat_statistics', ChatDailySchema);

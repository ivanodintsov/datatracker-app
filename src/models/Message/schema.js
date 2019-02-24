import createMessageSchema from './base';
import aggregateChatStatistic from './aggregateChatStatistic';
import aggregateUsersStatistics from './aggregateUsersStatistics';
import aggregateUsersActivity from './aggregateUsersActivity';

const MessageSchema = createMessageSchema();

MessageSchema.index({ chat: 1, message_id: 1 }, { unique: true });
MessageSchema.index({ from: 1 });
MessageSchema.index({ chat: 1 });
MessageSchema.index({ chat: 1, date: 1});
MessageSchema.index({ chat: 1, from: 1});
MessageSchema.index({ message_id: 1 });
MessageSchema.index({ 'entities.type': 1 });
MessageSchema.index({ 'caption_entities.type': 1 });

MessageSchema.statics.chatStatistics = function(chat) {
  return ranges => this.aggregate(aggregateChatStatistic(chat, ranges));
};

MessageSchema.statics.chatUsersStatistics = function(query) {
  return this.aggregate(aggregateUsersStatistics(query)).allowDiskUse(true);
};

MessageSchema.statics.chatUsersActivity = function(query) {
  return this.aggregate(aggregateUsersActivity(query)).allowDiskUse(true);
};

export default MessageSchema;

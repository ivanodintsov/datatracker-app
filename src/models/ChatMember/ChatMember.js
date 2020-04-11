import { baseStatistics } from '../Statistics/base';
import mongoose from 'mongoose';
import { ReputationSchema } from '../common/Reputation/Schema';
const Types = mongoose.Schema.Types;

const StatisticsSchema = baseStatistics({
  reputation: {
    type: Number,
    default: 0,
  },
}, { _id: false });
export const ChatMemberSchema = new mongoose.Schema(
  {
    chat: {
      type: Types.Long,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    status: {
      type: String
    },
    until_date: {
      type: Number
    },
    can_be_edited: {
      type: Boolean
    },
    can_change_info: {
      type: Boolean
    },
    can_post_messages: {
      type: Boolean
    },
    can_edit_messages: {
      type: Boolean
    },
    can_delete_messages: {
      type: Boolean
    },
    can_invite_users: {
      type: Boolean
    },
    can_restrict_members: {
      type: Boolean
    },
    can_pin_messages: {
      type: Boolean
    },
    can_promote_members: {
      type: Boolean
    },
    can_send_messages: {
      type: Boolean
    },
    can_send_media_messages: {
      type: Boolean
    },
    can_send_other_messages: {
      type: Boolean
    },
    can_add_web_page_previews: {
      type: Boolean
    },
    active: {
      type: Boolean
    },
    statistics: { type: StatisticsSchema, default: StatisticsSchema },
    last_message_date: {
      type: Date,
    },
    last_activity_date: {
      type: Date,
    },
    reputation: { type: ReputationSchema, default: ReputationSchema },
  },
  {
    timestamps: true
  }
);
ChatMemberSchema.index({ chat: 1, user: 1 }, { unique: true });
ChatMemberSchema.index({ status: 1 });

const changeReputation = async function (path, opts) {
  const { chat, user, type } = opts;

  const reputationUpdate = ReputationSchema.statics.buildReputationChange({
    path,
    reputation: type,
  });

  const member = this
    .where('chat', chat)
    .where('user', user)
    .updateOne(reputationUpdate);

  return member;
};

ChatMemberSchema.statics.changeReputation = async function (opts) {
  return changeReputation.bind(this)('reputation', opts);
};
const ChatMember = mongoose.model('chat_member', ChatMemberSchema);

export default ChatMember;

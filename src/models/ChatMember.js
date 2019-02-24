import { baseStatistics } from './Statistics/base';
import mongoose from 'mongoose';
const Types = mongoose.Schema.Types;

const StatisticsSchema = baseStatistics({}, { _id: false });
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
    statistics: { type: StatisticsSchema, default: StatisticsSchema }
  },
  {
    timestamps: true
  }
);
ChatMemberSchema.index({ chat: 1, user: 1 }, { unique: true });
ChatMemberSchema.index({ status: 1 });
const ChatMember = mongoose.model('chat_member', ChatMemberSchema);

export default ChatMember;

import { baseStatistics } from '../Statistics/base';
import mongoose from 'mongoose';
const Types = mongoose.Schema.Types;

const StatisticsSchema = baseStatistics({
  reputataion: {
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
  },
  {
    timestamps: true
  }
);
ChatMemberSchema.index({ chat: 1, user: 1 }, { unique: true });
ChatMemberSchema.index({ status: 1 });

const CHANGE_REPUTATION_TYPE = {
  INCREASE: {
    changer: 1,
  },
  DECREASE: {
    changer: -1,
  },
};

ChatMemberSchema.statics.changeReputation = async function changeReputation (opts) {
  const { chat, user, type } = opts;
  const changerType = CHANGE_REPUTATION_TYPE[type];

  if (!changerType) {
    return;
  }

  const member = this
    .where('chat', chat)
    .where('user', user)
    .update({
      $inc: {
        'statistics.reputataion': changerType.changer,
      },
    });

  return member;
};

const ChatMember = mongoose.model('chat_member', ChatMemberSchema);

export default ChatMember;

import R from 'ramda';
import mongoose from 'mongoose';
const Types = mongoose.Schema.Types;

export const baseStatistics = (addFields = {}, opts = {}) => new mongoose.Schema(
  {
    text: { type: Number, default: 0 },
    voice: { type: Number, default: 0 },
    video_note: { type: Number, default: 0 },
    sticker: { type: Number, default: 0 },
    audio: { type: Number, default: 0 },
    video: { type: Number, default: 0 },
    document: { type: Number, default: 0 },
    photo: { type: Number, default: 0 },
    reply: { type: Number, default: 0 },
    forward: { type: Number, default: 0 },
    edit: { type: Number, default: 0 },
    pinned: { type: Number, default: 0 },
    contact: { type: Number, default: 0 },
    location: { type: Number, default: 0 },
    game: { type: Number, default: 0 },
    venue: { type: Number, default: 0 },
    invoice: { type: Number, default: 0 },
    channel_chat_created: { type: Number, default: 0 },
    supergroup_chat_created: { type: Number, default: 0 },
    group_chat_created: { type: Number, default: 0 },
    migrate_to_chat: { type: Number, default: 0 },
    left_chat_member: { type: Number, default: 0 },
    new_chat_members: { type: Number, default: 0 },
    new_chat_photo: { type: Number, default: 0 },
    new_chat_title: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    ...addFields
  },
  opts
);

const base = (addFields = {}, opts = {}) => new mongoose.Schema(
  {
    ...addFields,
    chat: { type: Types.Long, required: true },
    text: { type: Number, default: 0 },
    voice: { type: Number, default: 0 },
    sticker: { type: Number, default: 0 },
    video: { type: Number, default: 0 },
    audio: { type: Number, default: 0 },
    document: { type: Number, default: 0 },
    photo: { type: Number, default: 0 },
    reply: { type: Number, default: 0 },
    forward: { type: Number, default: 0 },
    edit: { type: Number, default: 0 },
    pinned: { type: Number, default: 0 },
    channel_chat_created: { type: Number, default: 0 },
    supergroup_chat_created: { type: Number, default: 0 },
    group_chat_created: { type: Number, default: 0 },
    migrate_to_chat: { type: Number, default: 0 },
    left_chat_member: { type: Number, default: 0 },
    new_chat_members: { type: Number, default: 0 },
    new_chat_photo: { type: Number, default: 0 },
    new_chat_title: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    date: { type: Date }
  },
  {
    timestamps: true,
    ...opts
  }
);

export const baseStatisticsDefault = {
  text: 0,
  voice: 0,
  video_note: 0,
  sticker: 0,
  audio: 0,
  video: 0,
  document: 0,
  photo: 0,
  reply: 0,
  forward: 0,
  edit: 0,
  pinned: 0,
  contact: 0,
  location: 0,
  game: 0,
  venue: 0,
  invoice: 0,
  channel_chat_created: 0,
  supergroup_chat_created: 0,
  group_chat_created: 0,
  migrate_to_chat: 0,
  left_chat_member: 0,
  new_chat_members: 0,
  new_chat_photo: 0,
  new_chat_title: 0,
  total: 0
};
export const baseStatisticsKeys = R.keys(baseStatisticsDefault);

export default base;

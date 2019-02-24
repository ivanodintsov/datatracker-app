import R from 'ramda';
import { headOr } from '../../../helpers';
import { ChatMembersStats } from '../../../models';

const defaultResponse = R.always({
  text: 0,
  voice: 0,
  sticker: 0,
  audio: 0,
  document: 0,
  photo: 0,
  reply: 0,
  forward: 0,
  edit: 0,
  pinned: 0,
  contact: 0,
  game: 0,
  invoice: 0,
  location: 0,
  venue: 0,
  video: 0,
  video_note: 0,
  total: 0
});

const headOrDefault = headOr(defaultResponse);

const chatStatistics = async (_, { chat, range, timeZone }) => {
  const stats = await ChatMembersStats.chatStatistics(chat, range, timeZone);
  const mergedStats = headOrDefault(stats);
  return mergedStats;
};

export default chatStatistics;

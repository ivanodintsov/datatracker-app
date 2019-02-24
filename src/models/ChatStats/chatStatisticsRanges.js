import R from 'ramda';

const chatStatisticsRanges = R.curry((chat, matchRange, ranges) => [
  {
    $match: {
      'meta.chat': chat,
      'meta.date': {
        $in: matchRange
      }
    }
  },
  { $unwind: '$quarter' },
  {
    $match: {
      $expr: { $or: ranges }
    }
  },
  {
    $group: {
      _id: null,
      text: { $sum: '$quarter.text' },
      voice: { $sum: '$quarter.voice' },
      video_note: { $sum: '$quarter.video_note' },
      sticker: { $sum: '$quarter.sticker' },
      video: { $sum: '$quarter.video' },
      audio: { $sum: '$quarter.audio' },
      document: { $sum: '$quarter.document' },
      photo: { $sum: '$quarter.photo' },
      reply: { $sum: '$quarter.reply' },
      forward: { $sum: '$quarter.forward' },
      edit: { $sum: '$quarter.edit' },
      pinned: { $sum: '$quarter.pinned' },
      contact: { $sum: '$quarter.contact' },
      location: { $sum: '$quarter.location' },
      game: { $sum: '$quarter.game' },
      venue: { $sum: '$quarter.venue' },
      invoice: { $sum: '$quarter.invoice' },
      channel_chat_created: { $sum: '$quarter.channel_chat_created' },
      supergroup_chat_created: { $sum: '$quarter.supergroup_chat_created' },
      group_chat_created: { $sum: '$quarter.group_chat_created' },
      migrate_to_chat: { $sum: '$quarter.migrate_to_chat' },
      left_chat_member: { $sum: '$quarter.left_chat_member' },
      new_chat_members: { $sum: '$quarter.new_chat_members' },
      new_chat_photo: { $sum: '$quarter.new_chat_photo' },
      total: { $sum: '$quarter.total' }
    }
  },
  {
    $project: {
      _id: 0,
      text: 1,
      voice: 1,
      video_note: 1,
      sticker: 1,
      video: 1,
      audio: 1,
      document: 1,
      photo: 1,
      reply: 1,
      forward: 1,
      edit: 1,
      pinned: 1,
      contact: 1,
      location: 1,
      game: 1,
      venue: 1,
      invoice: 1,
      channel_chat_created: 1,
      supergroup_chat_created: 1,
      group_chat_created: 1,
      migrate_to_chat: 1,
      left_chat_member: 1,
      new_chat_members: 1,
      new_chat_photo: 1,
      total: 1,
    }
  }
]);

export default chatStatisticsRanges;

import R from 'ramda';

const aggregateChatStatistic = R.curry((chat, ranges) => [
  { $match: {
      chat,
      $expr: {
        $or: ranges
      }
    }
  },
  { $project: {
      chat: '$chat',
      text: '$text',
      voice: '$voice',
      sticker: '$sticker',
      audio: '$audio',
      document: '$document',
      photo: '$photo',
      reply_to_message: '$reply_to_message',
      forward_date: '$forward_date',
      edit_date: '$edit_date',
      pinned_message: '$pinned_message'
    }
  },
  { $group: {
      _id: { chat: '$chat' },
      text: { $sum: { $cond: [ { $ifNull: [ '$text', false ] }, 1, 0 ] } },
      voice: { $sum: { $cond: [ { $ifNull: [ '$voice', false ] }, 1, 0 ] } },
      sticker: { $sum: { $cond: [ { $ifNull: [ '$sticker', false ] }, 1, 0 ] } },
      audio: { $sum: { $cond: [ { $ifNull: [ '$audio', false ] }, 1, 0 ] } },
      document: { $sum: { $cond: [ { $ifNull: [ '$document', false ] }, 1, 0 ] } },
      photo: { $sum: { $cond: [ { $size: '$photo' }, 1, 0 ] } },
      reply: { $sum: { $cond: [ { $ifNull: [ '$reply_to_message', false ] }, 1, 0 ] } },
      forward: { $sum: { $cond: [ { $ifNull: [ '$forward_date', false ] }, 1, 0 ] } },
      edit: { $sum: { $cond: [ { $ifNull: [ '$edit_date', false ] }, 1, 0 ] } },
      pinned: { $sum: { $cond: [ { $ifNull: [ '$pinned_message', false ] }, 1, 0 ] } },
      total: { $sum: 1 }
    }
  },
  { $project: {
      _id: 0,
      text: 1,
      voice: 1,
      sticker: 1,
      audio: 1,
      document: 1,
      photo: 1,
      reply: 1,
      forward: 1,
      edit: 1,
      pinned: 1,
      total: 1
    }
  }
]);

export default aggregateChatStatistic;

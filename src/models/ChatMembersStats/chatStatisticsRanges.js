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
      _id: {
        chat: '$meta.chat',
        from: '$meta.user'
      },
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
      total: { $sum: '$quarter.total' }
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: '_id.from',
      foreignField: 'id',
      as: 'from'
    }
  },
  { $unwind: '$from' },
  {
    $lookup: {
      from: 'chat_members',
      let: { id: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [ { $eq: [ '$user', '$$id.from' ] }, { $eq: [ '$chat', '$$id.chat' ] } ]
            }
          }
        }
      ],
      as: 'status'
    }
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [
          '$$ROOT',
          { status: {
            $cond: [
                { $eq: [ { $size: '$status' }, 0 ] },
                { $literal: null }, 
                { $arrayElemAt: [ '$status.status', 0 ] }
            ]
          }}
        ]
      }
    }
  },
  {
    $project: {
      // _id: 0,
      from: 1,
      status: 1,
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
      total: 1,
      // activeDays: { $size: '$activeDays' }
    }
  },
  { $sort: { 'from.id': -1 } },
  { $sort: { total: -1 } }
]);

export default chatStatisticsRanges;

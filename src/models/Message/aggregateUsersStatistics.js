/**
 * @function
 * @name aggregateUsersStatistics
 * 
 * @param {Object}  query
 * @param {Float}   query.chat        - Chat ID
 * @param {Object}  query.range       - Date range
 * @param {Moment}  query.range.from  - Start Date
 * @param {Moment}  query.range.to    - End Date
 * @param {String}  query.timeZone    - Current timezone
 */
const aggregateUsersStatistics = ({ chat, range: { from, to }, timeZone }) => [
  { $match: { chat, date: { $gte: from.toDate(), $lte: to.toDate() } } },
  {
    $project: {
      date: '$date',
      from: '$from',
      chat: '$chat',
      text: '$text',
      voice: '$voice',
      sticker: '$sticker',
      video: '$video',
      audio: '$audio',
      document: '$document',
      photo: '$photo',
      reply_to_message: '$reply_to_message',
      forward_date: '$forward_date',
      edit_date: '$edit_date',
      pinned_message: '$pinned_message'
    }
  },
  {
    $group: {
      _id: {
        chat: '$chat',
        from: '$from',
        date: {
          $dateFromParts: {
            year: { $year: { date: '$date', timezone: timeZone } },
            month: { $month: { date: '$date', timezone: timeZone } },
            day: { $dayOfMonth: { date: '$date', timezone: timeZone } },
            timezone: timeZone
          }
        }
      },
      count: { $sum: 1 },
      text: { $sum: { $cond: [ { $ifNull: [ '$text', false ] }, 1, 0 ] } },
      voice: { $sum: { $cond: [ { $ifNull: [ '$voice', false ] }, 1, 0 ] } },
      sticker: { $sum: { $cond: [ { $ifNull: [ '$sticker', false ] }, 1, 0 ] } },
      video: { $sum: { $cond: [ { $ifNull: [ '$video', false ] }, 1, 0 ] } },
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
  {
    $group: {
      _id: { chat: '$_id.chat', from: '$_id.from' },
      text: { $sum: '$text' },
      voice: { $sum: '$voice' },
      sticker: { $sum: '$sticker' },
      video: { $sum: '$video' },
      audio: { $sum: '$audio' },
      document: { $sum: '$document' },
      photo: { $sum: '$photo' },
      reply: { $sum: '$reply' },
      forward: { $sum: '$forward' },
      edit: { $sum: '$edit' },
      total: { $sum: '$total' },
      pinned: { $sum: '$pinned' },
      activeDays: { $sum: 1 }
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
  { $sort: { 'from.id': -1 } },
  { $sort: { total: -1 } }
];

export default aggregateUsersStatistics;

import R from 'ramda';

const chatStatisticsAll = R.curry((chat, { from, to }, timeZone) => [
  {
    $match: {
      chat: chat,
      date: {
        $gte: new Date(from),
        $lte: new Date(to)
      }
    }
  },
  {
    $addFields: {
      date_time_zone: {
        $dateFromParts: {
          year: { $year: {
            date: '$date',
            timezone: timeZone
          }},
          month: { $month: {
            date: '$date',
            timezone: timeZone
          }},
          day: { $dayOfMonth: {
            date: '$date',
            timezone: timeZone
          }},
          timezone: timeZone
        }
      }
    }
  },
  {
    $group: {
      _id: {
        chat: '$chat',
        from: '$from'
      },
      text: { $sum: '$text' },
      voice: { $sum: '$voice' },
      video_note: { $sum: '$video_note' },
      sticker: { $sum: '$sticker' },
      video: { $sum: '$video' },
      audio: { $sum: '$audio' },
      document: { $sum: '$document' },
      photo: { $sum: '$photo' },
      reply: { $sum: '$reply' },
      forward: { $sum: '$forward' },
      edit: { $sum: '$edit' },
      pinned: { $sum: '$pinned' },
      contact: { $sum: '$contact' },
      location: { $sum: '$location' },
      game: { $sum: '$game' },
      venue: { $sum: '$venue' },
      invoice: { $sum: '$invoice' },
      channel_chat_created: { $sum: '$channel_chat_created' },
      supergroup_chat_created: { $sum: '$supergroup_chat_created' },
      group_chat_created: { $sum: '$group_chat_created' },
      migrate_to_chat: { $sum: '$migrate_to_chat' },
      left_chat_member: { $sum: '$left_chat_member' },
      new_chat_members: { $sum: '$new_chat_members' },
      new_chat_photo: { $sum: '$new_chat_photo' },
      total: { $sum: '$total' },
      activeDays: {
        $addToSet: '$date_time_zone'
      }
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
      as: 'chat_member'
    }
  },
  { $unwind: { path: '$chat_member', preserveNullAndEmptyArrays: true } },
  {
    $project: {
      from: 1,
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
      status: '$chat_member.status',
      activeDays: { $size: '$activeDays' }
    }
  },
  { $sort: { 'from.id': -1 } },
  { $sort: { total: -1 } }
]);

export default chatStatisticsAll;

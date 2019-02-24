import R from 'ramda';

const usersActivity = R.curry((chat, { from, to }, timeZone) => [
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
        from: '$from',
        date: '$date_time_zone'
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
    }
  },
  {
    $group: {
      _id: { date: '$_id.date' },
      users: { $sum: 1 },
      text: { $sum: { $cond: [ { $gt: [ '$text', 0 ] }, 1, 0 ] } },
      voice: { $sum: { $cond: [ { $gt: [ '$voice', 0 ] }, 1, 0 ] } },
      video_note: { $sum: { $cond: [ { $gt: [ '$video_note', 0 ] }, 1, 0 ] } },
      sticker: { $sum: { $cond: [ { $gt: [ '$sticker', 0 ] }, 1, 0 ] } },
      video: { $sum: { $cond: [ { $gt: [ '$video', 0 ] }, 1, 0 ] } },
      audio: { $sum: { $cond: [ { $gt: [ '$audio', 0 ] }, 1, 0 ] } },
      document: { $sum: { $cond: [ { $gt: [ '$document', 0 ] }, 1, 0 ] } },
      photo: { $sum: { $cond: [ { $gt: [ '$photo', 0 ] }, 1, 0 ] } },
      reply: { $sum: { $cond: [ { $gt: [ '$reply', 0 ] }, 1, 0 ] } },
      forward: { $sum: { $cond: [ { $gt: [ '$forward', 0 ] }, 1, 0 ] } },
      edit: { $sum: { $cond: [ { $gt: [ '$edit', 0 ] }, 1, 0 ] } },
      pinned: { $sum: { $cond: [ { $gt: [ '$pinned', 0 ] }, 1, 0 ] } },
      contact: { $sum: { $cond: [ { $gt: [ '$contact', 0 ] }, 1, 0 ] } },
      location: { $sum: { $cond: [ { $gt: [ '$location', 0 ] }, 1, 0 ] } },
      game: { $sum: { $cond: [ { $gt: [ '$game', 0 ] }, 1, 0 ] } },
      venue: { $sum: { $cond: [ { $gt: [ '$venue', 0 ] }, 1, 0 ] } },
      invoice: { $sum: { $cond: [ { $gt: [ '$invoice', 0 ] }, 1, 0 ] } },
      channel_chat_created: { $sum: { $cond: [ { $gt: [ 'channel_chat_created', 0 ] }, 1, 0 ] } },
      supergroup_chat_created: { $sum: { $cond: [ { $gt: [ 'supergroup_chat_created', 0 ] }, 1, 0 ] } },
      group_chat_created: { $sum: { $cond: [ { $gt: [ 'group_chat_created', 0 ] }, 1, 0 ] } },
      migrate_to_chat: { $sum: { $cond: [ { $gt: [ 'migrate_to_chat', 0 ] }, 1, 0 ] } },
      left_chat_member: { $sum: { $cond: [ { $gt: [ 'left_chat_member', 0 ] }, 1, 0 ] } },
      new_chat_members: { $sum: { $cond: [ { $gt: [ 'new_chat_members', 0 ] }, 1, 0 ] } },
      new_chat_photo: { $sum: { $cond: [ { $gt: [ 'new_chat_photo', 0 ] }, 1, 0 ] } },
      total: { $sum: { $cond: [ { $gt: [ '$total', 0 ] }, 1, 0 ] } }
    }
  },
  {
    $project: {
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
      users: 1,
      date: '$_id.date'
    }
  },
  { $sort: { date: 1 } }
]);

export default usersActivity;

import R from 'ramda';

const activeWeekDays = R.curry((chat, { from, to }, timeZone) => [
  {
    $match: {
      chat,
      date: {
        $gte: new Date(from),
        $lte: new Date(to)
      }
    }
  },
  {
    $group: {
      _id: {
        day: {
          $dayOfWeek: {
            date: '$date',
            timezone: timeZone
          }
        }
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
      total: { $sum: '$total' }
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
      total: 1,
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
      activeDays: 1,
      day: '$_id.day'
    }
  },
  { $sort: { day: 1 } }
]);

export default activeWeekDays;

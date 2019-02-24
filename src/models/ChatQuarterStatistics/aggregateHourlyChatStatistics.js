import R from 'ramda';

const aggregateHourlyChatStatistics = R.curry(({ chat, range: { from, to }, timeZone }) => [
  { $match: {
      chat,
      date: { $gte : new Date(from), $lte: new Date(to) }
    }
  },
  { $group: {
      _id: {
        chat: '$chat',
        hour: {
          $hour: {
            date: '$date',
            timezone: timeZone
          }
        }
      },
      text: { $sum: '$text' },
      voice: { $sum: '$voice' },
      sticker: { $sum: '$sticker' },
      audio: { $sum: '$audio' },
      document: { $sum: '$document' },
      photo: { $sum: '$photo' },
      reply: { $sum: '$reply' },
      forward: { $sum: '$forward' },
      edit: { $sum: '$edit' },
      pinned: { $sum: '$pinned' },
      total: { $sum: '$total' }
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
      total: 1,
      activeDays: 1,
      hour: '$_id.hour'
    }
  },
  { $sort: { hour: 1 } }
]);

export default aggregateHourlyChatStatistics;

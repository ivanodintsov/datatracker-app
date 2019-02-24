/**
 * @function
 * @name aggregateUsersActivity
 * 
 * @param {Object}  query
 * @param {Float}   query.chat        - Chat ID
 * @param {Object}  query.range       - Date range
 * @param {Moment}  query.range.from  - Start Date
 * @param {Moment}  query.range.to    - End Date
 * @param {String}  query.timeZone    - Current timezone
 */
const aggregateUsersActivity = ({ chat, range: { from, to }, timeZone }) => ([
  { $match: {
      chat,
      date: { $gte: from.toDate(), $lte: to.toDate() }
    }
  },
  { $project: {
      day: {
        $dayOfMonth: {
          date: '$date',
          timezone: timeZone
        }
      },
      month: {
        $month: {
          date: '$date',
          timezone: timeZone
        }
      },
      year: {
        $year: {
          date: '$date',
          timezone: timeZone
        }
      },
      chat: '$chat',
      from: '$from',
      text: '$text',
    }
  },
  { $group: {
      _id: { chat: '$chat', from: '$from', year: '$year', month: '$month', day: '$day' },
      text: { $sum: { $cond: [ { $ifNull: [ '$text', false ] }, 1, 0 ] } },
    }
  },
  { $group: {
      _id: { chat: '$_id.chat', year: '$_id.year', month: '$_id.month', day: '$_id.day' },
      users: { $sum: 1 },
      text: { $sum: { $cond: [ { $gt: [ '$text', 0 ] }, 1, 0 ] } },
    }
  },
  { $project: {
      _id: 0,
      users: 1,
      text: 1,
      date: {
        $dateFromParts: {
          year: '$_id.year',
          month: '$_id.month',
          day: '$_id.day',
          timezone: timeZone
        }
      }
    }
  },
  { $sort: { date: 1 } }
]);

export default aggregateUsersActivity;

import R from 'ramda';
import moment from 'moment-timezone';

const chatStatistics = R.curry((chat, [ from, to ]) => [
  {
    $match: {
      'meta.chat': chat,
      'meta.date': {
        $gte: moment(from).startOf('day').toDate(),
        $lte: moment(to).startOf('day').toDate()
      }
    }
  },
  {
    $group: {
      _id: null,
      text: { $sum: '$daily.text' },
      voice: { $sum: '$daily.voice' },
      video_note: { $sum: '$daily.video_note' },
      sticker: { $sum: '$daily.sticker' },
      video: { $sum: '$daily.video' },
      audio: { $sum: '$daily.audio' },
      document: { $sum: '$daily.document' },
      photo: { $sum: '$daily.photo' },
      reply: { $sum: '$daily.reply' },
      forward: { $sum: '$daily.forward' },
      edit: { $sum: '$daily.edit' },
      pinned: { $sum: '$daily.pinned' },
      contact: { $sum: '$daily.contact' },
      location: { $sum: '$daily.location' },
      game: { $sum: '$daily.game' },
      venue: { $sum: '$daily.venue' },
      invoice: { $sum: '$daily.invoice' },
      channel_chat_created: { $sum: '$daily.channel_chat_created' },
      supergroup_chat_created: { $sum: '$daily.supergroup_chat_created' },
      group_chat_created: { $sum: '$daily.group_chat_created' },
      migrate_to_chat: { $sum: '$daily.migrate_to_chat' },
      left_chat_member: { $sum: '$daily.left_chat_member' },
      new_chat_members: { $sum: '$daily.new_chat_members' },
      new_chat_photo: { $sum: '$daily.new_chat_photo' },
      total: { $sum: '$daily.total' }
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

export default chatStatistics;

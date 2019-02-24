import R from 'ramda';

const pickRenameKeys = R.curry((keysMap, obj) => R.reduce((acc, key) => {
  if (R.has(key, keysMap)) {
    return R.assoc(keysMap[key] || key, obj[key], acc);
  }

  return acc;
}, {}, R.keys(obj)));

const statisticsTypes = {
  text: 'text',
  voice: 'voice',
  sticker: 'sticker',
  video: 'video',
  video_note: 'video_note',
  contact: 'contact',
  location: 'location',
  venue: 'venue',
  game: 'game',
  invoice: 'invoice',
  audio: 'audio',
  document: 'document',
  photo: 'photo',
  reply_to_message: 'reply',
  forward_date: 'forward',
  edit_date: 'edit',
  pinned_message: 'pinned',
  channel_chat_created: 'channel_chat_created',
  supergroup_chat_created: 'supergroup_chat_created',
  group_chat_created: 'group_chat_created',
  migrate_to_chat_id: 'migrate_to_chat',
  left_chat_member: 'left_chat_member',
  new_chat_members: 'new_chat_members',
  new_chat_photo: 'new_chat_photo',
  new_chat_title: 'new_chat_title'
};

const statisticsReduceFn = statTypes => msg => (acc, el) => {
  if (R.has(el, msg)) {
    const key = statTypes[el];
    acc[key] = 1;
  }

  return acc;
};

const statisticsReduce = statTypes => {
  const statisticsTypesKeys = R.keys(statTypes);

  return (...args) => R.reduce(statisticsReduceFn(statTypes)(...args), {}, statisticsTypesKeys);
};
const getStatistics = statisticsReduce(statisticsTypes);
const getMetaData = R.pick([ 'chat', 'from', 'date' ]);
const constantData = R.always({ total: 1 });

const stickersProps = {
  set_name: 'name'
};

const getStickerData = R.ifElse(
  R.has('sticker'),
  R.pipe(
    R.prop('sticker'),
    pickRenameKeys(stickersProps),
    R.assoc('sticker_data', R.__, {})
  ),
  R.F
);

const getBaseStatisticsData = R.pipe(
  R.juxt([
    getMetaData,
    getStatistics,
    getStickerData,
    constantData
  ]),
  R.mergeAll
);

const constantEditData = R.always({ edit: 1 });
const getEditStatisticsData = R.pipe(
  R.juxt([
    getMetaData,
    constantEditData
  ]),
  R.mergeAll
);

const updateStatusFns = {
  NOT_EXISTS: getBaseStatisticsData,
  UPDATED: getEditStatisticsData,
  NOT_UPDATED: R.F
};

export const statisticsFromMessage = (msg, status) => R.pipe(
  R.propOr(getBaseStatisticsData, R.__, updateStatusFns),
  R.apply(R.__, [ msg ])
)(status);

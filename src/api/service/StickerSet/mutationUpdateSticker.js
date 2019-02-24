import { StickerSet } from '../../../models';
import R from 'ramda';
import logError from '../../../helpers/logError';

const createSetData = R.pipe(
  R.toPairs,
  R.map(el => [ `stickers.$.${el[0]}`, el[1] ]),
  R.fromPairs
);

const updateSticker = async (_, { name, file_id, set }) => {
  try {
    const setData = createSetData(set);
    await StickerSet.updateOne({ name, 'stickers.file_id': file_id }, setData);

    return true;
  } catch (e) {
    logError('updateSticker', { name, file_id, set });
    return false;
  }
};

export default updateSticker;

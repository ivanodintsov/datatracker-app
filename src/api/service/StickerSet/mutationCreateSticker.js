import R from 'ramda';
import { StickerSet } from '../../../models';

const NEW_STICKER = 'NEW_STICKER';
const NEW_SET = 'NEW_SET';

const createSticker = async (_, { name, sticker }) => {
  const newSticker = await StickerSet.updateOne(
    { name },
    { $addToSet: { stickers: sticker }, $inc: { count: 1 } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  if (R.prop('upserted', newSticker)) {
    return {
      type: NEW_SET
    };
  }

  return {
    type: NEW_STICKER
  };
};

export default createSticker;

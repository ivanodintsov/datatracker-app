import R from 'ramda';
import { StickerSet } from '../../../models';

const findSticker = async (_, { name, file_id }) => {
  const stickers = await StickerSet.findOne(
    { name, 'stickers.file_id': file_id },
    { 'stickers.$': 1 }
  );
  return R.path([ 'stickers', 0 ], stickers);
};

export default findSticker;

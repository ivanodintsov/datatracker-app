import R from 'ramda';
import { StickerSet } from '../../../models';

class StickerSetNotFound extends Error {
  super() {
    this.code = 40001;
    this.message = 'Sticker set not found';
  }
}

const stickerSetByName = async (_, { name }) => {
  const stickerSet = await StickerSet.findOne({ name });

  if (R.isNil(stickerSet)) {
    throw new StickerSetNotFound();
  }

  return stickerSet;
};

export default stickerSetByName;

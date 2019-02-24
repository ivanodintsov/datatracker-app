import { StickerSet } from '../../../models';

const allStickerSets = async () => {
  return await StickerSet.find();
};

export default allStickerSets;

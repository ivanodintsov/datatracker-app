import { StickerSet } from '../../../models';
import logError from '../../../helpers/logError';

const updateStickerSet = async (_, { name, set }) => {
  try {
    await StickerSet.updateOne({ name }, set);
  } catch (e) {
    logError('updateStickerSet', { name, set });
  }

  return false;
};

export default updateStickerSet;

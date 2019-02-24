import allStickerSets from './queryAllStickerSets';
import findSticker from './queryFindSticker';

import updateSticker from './mutationUpdateSticker';
import updateStickerSet from './mutationUpdateStickerSet';
import createSticker from './mutationCreateSticker';

export const resolver = {
  Query: {
    allStickerSets,
    findSticker
  },

  Mutation: {
    createSticker,
    updateStickerSet,
    updateSticker
  }
};

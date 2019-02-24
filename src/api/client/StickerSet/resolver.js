import stickersSetsPagination from './queryStickersSetsPagination';
import stickerSetByName from './queryStickerSetByName';
import searchStickerSets from './querySearchStickerSets';

export const resolver = {
  Query: {
    stickersSetsPagination,
    stickerSetByName,
    searchStickerSets
  }
};

import R from 'ramda';
import { StickerSet } from '../../../models';
const PAGE_SIZE = 12;
const STICKERS_SIZE = 4;

const stickersSetsPagination = async (_, { page = 0 }) => {
  const stickerSets = await StickerSet.find({}, { stickers: { $slice: STICKERS_SIZE } })
    .sort({ 'statistics.used': -1 })
    .skip(PAGE_SIZE * page)
    .limit(PAGE_SIZE);

  return {
    data: stickerSets,
    page: page,
    last: R.isEmpty(stickerSets)
  };
};

export default stickersSetsPagination;

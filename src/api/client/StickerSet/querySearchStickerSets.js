import R from 'ramda';
import { StickerSet } from '../../../models';
const PAGE_SIZE = 10;

const searchStickerSets = async (_, { search }) => {
  const searchRegex =  new RegExp(search, 'i');

  const stickerSets = await StickerSet.aggregate([
    {
      $match: { $or: [ { name: { $regex: searchRegex } }, { title: { $regex: searchRegex } } ] },
    },
    {
      $limit: PAGE_SIZE
    },
    {
      $project: {
        title: '$title',
        name: '$name',
        stickers: [ { $arrayElemAt: [ '$stickers', 0 ] } ],
        count: { $size: '$stickers' }
      }
    }
  ]);

  return {
    data: stickerSets,
    lastId: R.nth(-1, stickerSets)._id
  };
};

export default searchStickerSets;

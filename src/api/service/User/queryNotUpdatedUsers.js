import { User } from '../../../models';
import moment from 'moment-timezone';

const notUpdatedUsers = async (_, { days, limit }) => {
  const date = moment().startOf('day').add(-days, 'days');

  return await User.find({
    updatedAt: { $lte: date }
  }).limit(limit);
};

export default notUpdatedUsers;

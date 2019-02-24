import allUsers from './queryAllUsers';
import notUpdatedUsers from './queryNotUpdatedUsers';

import createUser from './mutationCreateUser';
import createUsers from './mutationCreateUsers';
import updateUser from './mutationUpdateUser';

export const resolver = {
  Query: {
    allUsers,
    notUpdatedUsers
  },

  Mutation: {
    createUser,
    createUsers,
    updateUser
  }
};

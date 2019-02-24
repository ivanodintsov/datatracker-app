import mongoose from 'mongoose';

export const createUserSchema = (addFields = {}, opts = {}) => new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true
    },
    is_bot: {
      type: Boolean,
      default: false
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: String,
    username: String,
    language_code: String,
    ...addFields
  },
  opts
);

export const UserSchema = createUserSchema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    photo: [{
      file_name: String,
      file_size: Number,
      width: Number,
      height: Number
    }]
  },
  {
    timestamps: true
  }
);
const User = mongoose.model('user', UserSchema);

export default User;

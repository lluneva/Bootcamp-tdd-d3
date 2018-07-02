import mongoose from 'mongoose';
import { userSchema } from './UserModel';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, unique: true, required: true },
    username: { userSchema },
    images: { type: String, unique: false, required: true },
  },
  { timestamps: true },
);

postSchema.pre('save', async next => {
  next();
});

const PostModel = mongoose.model('User', postSchema);

const save = async model => new PostModel(model).save();

const getPostByUser = async username => PostModel.findOne({ username });

const getRandomPosts = async () => PostModel.findOne();

export { save, getPostByUser, getRandomPosts };

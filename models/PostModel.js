import mongoose from 'mongoose';
import { userSchema } from './UserModel';
import { mediaSchema } from './MediaModel';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, unique: true, required: true },
    username: { userSchema },
    media: { mediaSchema },
  },
  { timestamps: true },
);

postSchema.pre('save', async next => {
  next();
});

const PostModel = mongoose.model('Post', postSchema);

const save = async model => new PostModel(model).save();

const getPostByUser = async username => PostModel.findOne({ username });

const getRandomPosts = async () => PostModel.findOne();

export { save, getPostByUser, getRandomPosts };

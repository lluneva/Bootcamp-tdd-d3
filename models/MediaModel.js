import mongoose from 'mongoose';
import { userSchema } from './UserModel';

const mediaSchema = new mongoose.Schema(
  {
    username: { userSchema },
    url: { type: String, unique: true, required: true },
  },
  { timestamps: true },
);

const MediaModel = mongoose.model('Media', mediaSchema);

const save = async model => new MediaModel(model).save();

const getMediaById = async _id => MediaModel.findOneById({ _id });

const getMediaByUser = async userName => MediaModel.findOneBy({ userName });

export { save, getMediaById, getMediaByUser, mediaSchema };

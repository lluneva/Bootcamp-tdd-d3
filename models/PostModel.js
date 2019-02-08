import mongoose from 'mongoose';

// TODO Task.2

/**
 * Create post schema which reflects instagram post - picture with caption
 *
 * 1. Fields: title, username. Options: (string typed, unique and required)
 * 2. Fields: media - nested schema with fields - contentId, path. Options: (string typed, unique and required)
 * 2. With Timestamp
 */
const postSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    media: {
      contentId: { type: String, unique: true, required: true },
      path: { type: String, unique: true, required: true },
    },
  },
  { timestamps: true },
);

/**
 * 1. Define post model from schema
 */
const PostModel = mongoose.model('Post', postSchema);

/**
 * 1. Create and save model;
 *
 * @param {*} model
 */
const save = async model => PostModel(model).save();

/**
 * 1. Retrieves last (findOne) post by username
 *
 * @param {*} username
 */
const getPostByUser = async username => PostModel.findOne({username});

/**
 * 1. Retrieves post by id (findById)
 *
 * @param {*} _id
 */
const getPostById = async _id =>PostModel.findById(_id);

/**
 * 1. Retrieves random posts (find)  
 */
const getRandomPosts = async() => PostModel.find(); 

export { save, getPostByUser, getRandomPosts, getPostById, postSchema, PostModel };

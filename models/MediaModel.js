import mongoose from 'mongoose';

// TODO Task.1

/**
 * Create media schema, which is used to save to db mapping of uploaded media id, path and username
 *
 * 1. Fields: username, path. Options: (string typed, unique and required)
 * 2. With Timestamp
 */
const mediaSchema = new mongoose.Schema(
    {
        username : { type :String, unique: true},
        path :  { type :String, unique: true},
    },
    { 
        timestamps: true
    },
);

/**
 * 1. Define media model from schema
 */
const MediaModel = mongoose.model('Media', mediaSchema);

/**
 * 1. Create and save model;
 *
 * @param {*} model
 */
const save = async model => new MediaModel(model).save();

/**
 * 1. findOne MediaModel by id
 *
 * @param {*} id
 */
const getMediaById = async id => MediaModel.findById(id);

/**
 * 1. findOne MediaModel by username
 *
 * @param {*} username
 */
const getMediaByUser = async username => MediaModel.findOne({username});

export { save, getMediaById, getMediaByUser, mediaSchema, MediaModel };

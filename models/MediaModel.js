import mongoose from 'mongoose';

// TODO Task.1

/**
 * Create media schema, which is used to save to db mapping of uploaded media id, path and username
 *
 * 1. Fields: username, path. Options: (string typed, unique and required)
 * 2. With Timestamp
 */
const mediaSchema = undefined;

/**
 * 1. Define media model from schema
 */
const MediaModel = undefined;

/**
 * 1. Create and save model;
 *
 * @param {*} model
 */
const save = undefined;

/**
 * 1. findOne MediaModel by id
 *
 * @param {*} id
 */
const getMediaById = undefined;

/**
 * 1. findOne MediaModel by username
 *
 * @param {*} username
 */
const getMediaByUser = undefined;

export { save, getMediaById, getMediaByUser, mediaSchema, MediaModel };

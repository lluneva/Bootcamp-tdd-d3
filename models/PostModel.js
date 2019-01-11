import mongoose from 'mongoose';

// TODO Task.2

/**
 * Create post schema which reflects instagram post - picture with caption
 *
 * 1. Fields: title, username. Options: (string typed, unique and required)
 * 2. Fields: media - nested schema with fields - contentId, path. Options: (string typed, unique and required)
 * 2. With Timestamp
 */
const postSchema = undefined;

/**
 * 1. Define post model from schema
 */
const PostModel = undefined;

/**
 * 1. Create and save model;
 *
 * @param {*} model
 */
const save = undefined;

/**
 * 1. Retrieves last (findOne) post by username
 *
 * @param {*} model
 */
const getPostByUser = undefined;

/**
 * 1. Retrieves post by id (findById)
 *
 * @param {*} _id
 */
const getPostById = undefined;

/**
 * 1. Retrieves random posts (find)
 */
const getRandomPosts = undefined;

export { save, getPostByUser, getRandomPosts, getPostById, postSchema, PostModel };

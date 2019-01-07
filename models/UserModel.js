import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

// TODO Task.1

/**
 * New mongoose schema (mongoose.Schema) should be defined here:
 * 1. Fields: username, email, rehashedPassword. Options: (string typed, automatically trimed, unique and required)
 * 2. With Timestamp
 *
 * DOCS: https://mongoosejs.com/docs/guide.html
 */
const userSchema = undefined;

/**
 * Pre save hook should be attached to schema to hash password every time we try to save user model;
 * 3. bcrypt should be used for hashing, 10 hashing rounds, rounds amount should be saved to consts or .env
 *
 * DOCS: https://mongoosejs.com/docs/middleware.html#pre
 * DOCS: https://www.npmjs.com/package/bcrypt#with-promises
 */
userSchema.pre();

const UserModel = mongoose.model('User', userSchema);

/**
 * This function should create new mongoose model and save it. Using promises not callbacks
 * 4. Save model using promises.
 *
 * DOCS: https://mongoosejs.com/docs/models.html
 * @param {*} model object to save
 */
const save = undefined;

/**
 * 5. Find user by its name. Using Promises and findOne query function
 *
 * DOCS: https://mongoosejs.com/docs/queries.html
 * @param {*} username used during registration
 */
const getUserByName = undefined;

/**
 * 6. Find user by its name. Using Promises and findOne query function.
 *
 * DOCS: https://mongoosejs.com/docs/queries.html
 * @param {*} email used during registration
 */
const getUserByEmail = undefined;

/**
 * 7. Compare passwords using bcrypt compare function. Return true or false;
 *
 * @param { userPassword, rehashedPassword } param0 received password and password from db
 */
const comparePassword = async ({ userPassword, rehashedPassword }) => {};

// TODO Study.1

/**
 * Additional validations to check user existance, to avoid duplicates in db;
 *
 * DOCS: https://mongoosejs.com/docs/validation.html
 */
UserModel.schema
  .path('username')
  .validate(async username => !(await getUserByName(username)), 'User already exists!');

UserModel.schema
  .path('email')
  .validate(async email => !(await getUserByEmail(email)), 'User already exists!');

export { save, getUserByName, getUserByEmail, comparePassword, userSchema, UserModel };

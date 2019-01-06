// TODO Task.4

/**
 * 1. Logger should be imported from previously created logger module and
 * its constructor function should be called with module name;
 * Either import or require (for shorter syntax) can be used
 */
const logger = undefined;

/**
 * defaultErrorHandler is used to catch all errors which were passed to next inside all our applications
 * It should:
 * 2. Log error to the error level, message should contain name, status and message
 * 3. Send response bac to the client, with status error.status and body { error: error.message }
 * 4. function should be exported to use it from other modules
 * DOCS: https://expressjs.com/en/guide/error-handling.html
 *
 * @param {*} error Error object
 * @param {*} req HTTP request parsed to object by bodyparser with data coming from the client
 * @param {*} res Response object we are using to send HTTP response back to the client
 * @param {*} next Function which is used to pass request execution flow to next middleware, if needed
 */
const defaultErrorHandler = (error, req, res, next) => {};

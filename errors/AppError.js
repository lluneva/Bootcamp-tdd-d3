// TODO Study.2
export default class AppError extends Error {
  /**
   * This class is create for adding custom arguments creating Error class
   * Without AppError class there will be need to attach status every time we creating default Error
   *
   * const error = new Error('Message');
   * error.status = 400;
   * vs
   * const appError = new AppError('Message', 400);
   *
   * @param {*} message Custom Error Message
   * @param {*} status Custom Error Status
   */
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
  }
}

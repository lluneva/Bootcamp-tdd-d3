import AppError from './AppError';

/**
 * AuthError should be used to specify errors for Authentication from Application Errors.
 *
 */
export default class AuthError extends AppError {
  constructor(message) {
    super(message || 'Authentication failed', 401);
  }
}

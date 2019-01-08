import AppError from './AppError';

// TODO Study.2
/**
 * AuthError should be used to specify errors for Authentication from Application Errors.
 *
 */
export default class AuthError extends AppError {
  constructor(message) {
    super(message || 'Authentication failed', 401);
  }
}

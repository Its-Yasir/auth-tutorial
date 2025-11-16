/**
 * These routes are acessible to the public
 * These routes don't require authentication
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/auth/new-verification",
];

/**
 * These routes are used for authentication
 * These routes will redirect user to settings page
 * @type {string[]}
 */

export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
]

/**
 * The prefix for API authentication routes
 * Routes that start with prefix are used for API authentication purpose
 * @type {string}
 */

export const apiAuthRoutes = "/api/auth";

/**
 * User is redirected to this page after logging in
 * @type {string}
 */

export const  DEFAULT_LOGIN_REDIRECT = '/settings';
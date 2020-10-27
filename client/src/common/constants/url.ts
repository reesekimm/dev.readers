export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_API
    : process.env.NEXT_PUBLIC_PROD_API;

export const GITHUB_AUTH_LINK = `${BASE_URL}/user/auth/github`;

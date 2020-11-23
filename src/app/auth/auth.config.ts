import { ENV } from './../core/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
};

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'mZ7Z9gKoS2rVvcsz2RSeQJB6y133fk4V',
  CLIENT_DOMAIN: 'dev-pq-481vx.us.auth0.com', // e.g., you.auth0.com
  AUDIENCE: 'http://localhost:4200', // e.g., http://localhost:8083/api/
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: 'openid profile'
};
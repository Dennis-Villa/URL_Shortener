import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  WEB_SERVICE_URL: get('WEB_SERVICE_URL').required().asUrlString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
}
'use server';

import { cookies } from 'next/headers';
import { TOKEN_KEYS } from './keys';

export async function getAccessToken() {
  const token = cookies().get(TOKEN_KEYS.ACCESS_TOKEN);
  return token;
}

import { ILoggedUser } from '@/lib/types';
import { jwtDecode } from 'jwt-decode';

export enum TOKEN_KEYS {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
}

export function getAccessTokenFromLocal() {
  return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
}

export function saveAccessTokeToLocal(token: string) {
  localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
}

export function getLoggedUser(): ILoggedUser | null {
  const accessToken = getAccessTokenFromLocal();
  if (!accessToken) return null;

  const userInfo = jwtDecode(accessToken);
  if (!userInfo) return null;

  return userInfo as ILoggedUser;
}

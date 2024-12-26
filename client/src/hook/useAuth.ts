import { getAccessTokenFromLocal, getLoggedUser, saveAccessTokeToLocal } from '@/helper';

export function useAuth() {
  return { getToken: getAccessTokenFromLocal, getUser: getLoggedUser, saveToken: saveAccessTokeToLocal };
}

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface ILoggedUser {
  _id: string;
  email: string;
  name: string;
  role: USER_ROLE;
}

import { MODE } from './common.type';

export type TCategory = {
  id: string;
  name: string;
  mode: MODE;
  isDeleted: boolean;
};

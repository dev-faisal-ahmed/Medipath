export interface IService {
  _id: string;
  name: string;
  price: number;
  roomNo?: string;
  isDeleted: boolean;
}

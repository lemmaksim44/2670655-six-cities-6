import { UserType } from './user';

export type UserAuthType = UserType & {
  email: string;
  token: string;
};

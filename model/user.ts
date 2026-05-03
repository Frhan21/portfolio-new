export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updateAt: string;
};

export type TUserLoginRequest = Omit<User, 'id' | 'createdAt' | 'updateAt'>;
export type TUserRegisterRequest = Omit<User, 'id' | 'createdAt' | 'updateAt'>;

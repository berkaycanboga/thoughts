export interface User {
  id: number;
  username: string;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  password?: string;
}

export interface SignUpUser {
  fullName: string;
  username: string;
  identifier: string;
  password: string;
}

export interface LoginUser {
  identifier: string;
  password: string;
}

export interface UserData {
  username: string;
  password: string;
}

export const users: Record<'standard', UserData> = {
  standard: {
    username: process.env.AUTH_USER ?? 'standard_user',
    password: process.env.AUTH_PASSWORD ?? 'secret_password'
  }
};

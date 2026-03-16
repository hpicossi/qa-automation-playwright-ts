export interface UserData {
  email: string;
  password: string;
}

export const users: Record<'standard', UserData> = {
  standard: {
    email: process.env.AUTH_EMAIL ?? process.env.AUTH_USER ?? 'qa.portfolio@example.com',
    password: process.env.AUTH_PASSWORD ?? 'Password123!'
  }
};

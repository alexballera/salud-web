export type TProps = {
  handleLogin: (user: any) => void;
  handleLoading: (isLoading: boolean) => void;
  handleError: (open: boolean, message?: string) => void;
  fetching: boolean;
};

export type TLoginData = {
  email: string;
  password: string;
};

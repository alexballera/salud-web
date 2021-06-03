export type IProps = {
  errorState: { open: boolean; message: string };
  handleError: (open: boolean, message?: string) => void;
};

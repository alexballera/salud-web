export type IProps = {
  email?: string;
  handleLoading?: (loading: boolean) => void;
};

export type IValidationDataForm = {
  email: string;
  validPin: string;
  pinCode: string;
};

export type IPasswordDataForm = {
  email: string;
  newPassword: string;
  newPasswordConfirm: string;
};
/// TYPES END

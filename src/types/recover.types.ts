import { INotificationProps } from '../context/types';

/// TYPES
export type IProps = {
  email?: string;
  handleLoading?: (loading: boolean) => void;
  handleNotifications?: (props: INotificationProps) => void;
};

export type IValidationDataForm = {
  email: string;
  validPin: string;
  pinCode: string;
};

export type IPasswordDataForm = {
  email: string;
  pinCode: string;
  newPassword: string;
  newPasswordConfirm: string;
};
/// TYPES END

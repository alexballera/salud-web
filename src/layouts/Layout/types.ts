import { AppStates, INotificationProps } from '../../context/types';

export type IProps = {
  errorState: { open: boolean; message: string; type: 'success' | 'error' | 'warning' };
  handleError: (open: boolean, message?: string, type?: 'success' | 'error' | 'warning') => void;
  notificationState: INotificationProps;
  handleNotifications: (props: INotificationProps) => void;
} & AppStates;

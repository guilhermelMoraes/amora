import Alert, { AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import './notification.css';

type NotificationProps = {
  type?: AlertColor;
  title?: string;
  message: string;
  /**
   * @description Prop injected by the React Toastify library. DO NOT use it unless you're sure on what you're doing
   */
  closeToast?: () => {};
};

function Notification({ type, title, message, closeToast }: NotificationProps) {
  return (
    <Alert severity={type} onClose={closeToast}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );
}

Notification.defaultProps = {
  type: 'info',
};

export default Notification;
export type { NotificationProps };

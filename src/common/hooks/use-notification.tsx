import { toast, ToastOptions } from 'react-toastify';
import Notification, {
  NotificationProps,
} from '../components/notification/notification';

function useNotification() {
  const notify = (notification: NotificationProps, options?: ToastOptions) => {
    toast(<Notification {...notification} />, options);
  };

  return notify;
}

export default useNotification;

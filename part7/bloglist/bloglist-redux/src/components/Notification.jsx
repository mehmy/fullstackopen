import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const error = useSelector((state) => state.error);

  return (
    <div
      className={(notification !== '' && 'notif') || (error !== '' && 'error')}
    >
      {notification}
      {error}
    </div>
  );
};

export default Notification;

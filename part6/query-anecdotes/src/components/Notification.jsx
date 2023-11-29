import { useContext } from 'react';
import { CreateContext } from '../CreateContext';
const Notification = () => {
  const [notification, dispatch] = useContext(CreateContext);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return <div style={style}> {notification}</div>;
};

export default Notification;

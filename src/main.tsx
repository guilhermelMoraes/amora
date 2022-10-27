import { Flip, ToastContainer } from 'react-toastify';
import Router from './common/router';

function Main() {
  return (
    <>
      <ToastContainer
        transition={Flip}
        hideProgressBar
        toastClassName="notification__container"
        limit={1}
        closeButton={false}
      />
      <Router />
    </>
  );
}

export default Main;

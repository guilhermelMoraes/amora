import { ThemeProvider } from '@mui/material/styles';
import { Flip, ToastContainer } from 'react-toastify';
import Router from './common/router';
import theme from './common/styles/theme';

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        transition={Flip}
        hideProgressBar
        toastClassName="notification__container"
        limit={1}
        closeButton={false}
      />
      <Router />
    </ThemeProvider>
  );
}

export default Main;

/* eslint-disable consistent-return */
import { redirect, RouteObject } from 'react-router-dom';

import userLoggedIn from '../../common/auth/auth';
import ErrorPage from '../error/error.page';
import AccountPage from './account.page';

async function redirectAuthenticatedUser() {
  const user = await userLoggedIn();
  if (user) {
    return redirect('/');
  }
}

const account: RouteObject = {
  path: '/connect',
  loader: async () => redirectAuthenticatedUser(),
  element: <AccountPage />,
  errorElement: <ErrorPage />,
};

export default account;

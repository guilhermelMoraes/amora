/* eslint-disable consistent-return */
import { redirect, RouteObject } from 'react-router-dom';

import ErrorPage from '../error/error.page';
import AuthPage from './auth.page';
import userLoggedIn from './services/auth-status';

async function redirectAuthenticatedUser() {
  const user = await userLoggedIn();
  if (user) {
    return redirect('/');
  }
}

const auth: RouteObject = {
  path: '/auth',
  loader: async () => redirectAuthenticatedUser(),
  element: <AuthPage />,
  errorElement: <ErrorPage />,
};

export default auth;

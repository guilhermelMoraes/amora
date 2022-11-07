/* eslint-disable consistent-return */
import { redirect } from 'react-router-dom';
import userLoggedIn from './auth-status';

async function privateRoute() {
  const user = await userLoggedIn();
  if (!user) {
    return redirect('/auth');
  }
}

export default privateRoute;

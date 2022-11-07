/* eslint-disable consistent-return */
import { redirect } from 'react-router-dom';
import userLoggedIn from './auth';

async function privateRoute() {
  const user = await userLoggedIn();
  if (!user) {
    return redirect('/connect');
  }
}

export default privateRoute;

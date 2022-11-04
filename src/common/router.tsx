import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AccountPage from '../modules/account/account.page';
import DashboardPage from '../modules/dashboard/dashboard.page';
import ErrorPage from '../modules/error/error.page';
import userLoggedIn from './auth/auth';

const router = createBrowserRouter([
  {
    path: '/connect',
    loader: () => userLoggedIn,
    element: <AccountPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    loader: () => userLoggedIn,
    element: <DashboardPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;

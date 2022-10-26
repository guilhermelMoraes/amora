import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AccountPage from '../account/account.page';
import ErrorPage from '../error/error.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AccountPage />,
    errorElement: <ErrorPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;

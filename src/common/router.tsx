import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AccountPage from '../account/account.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AccountPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;

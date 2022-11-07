import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import account from '../modules/account/account.route';
import dashboard from '../modules/dashboard/dashboard.route';

const router = createBrowserRouter([account, dashboard]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;

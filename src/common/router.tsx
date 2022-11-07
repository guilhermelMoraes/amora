import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import auth from '../modules/auth/auth.route';
import dashboard from '../modules/dashboard/dashboard.route';

const router = createBrowserRouter([auth, dashboard]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUpPage from '../sign-up/sign-up.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUpPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;

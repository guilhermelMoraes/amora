import { RouteObject } from 'react-router-dom';

import privateRoute from '../auth/services/private-route';
import ErrorPage from '../error/error.page';
import DashboardPage from './dashboard.page';

const dashboard: RouteObject = {
  path: '/',
  loader: () => privateRoute(),
  element: <DashboardPage />,
  errorElement: <ErrorPage />,
};

export default dashboard;

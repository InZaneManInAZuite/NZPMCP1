import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/Landing.page';
import LoginPage from './pages/Login.page';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  }, {
    path: '/signup',
    element: <LoginPage />,
  }, {
    path: '/admin',
    element: <LoginPage />,
  }, {
    path: '/',
    element: <LandingPage />,
  }, {
    path: '*',
    element: <LandingPage />,
  }
]);

const Router = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/Landing.page';
import LoginPage from './pages/Login.page';
import SignUpPage from './pages/Signup.page';
import AdminPage from './pages/Admin.page';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  }, {
    path: '/signup',
    element: <SignUpPage />,
  }, {
    path: '/admin',
    element: <AdminPage />,
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
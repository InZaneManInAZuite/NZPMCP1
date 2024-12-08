import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/Landing.page';

const router = createBrowserRouter([
  {
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
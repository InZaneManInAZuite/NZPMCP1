import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from './pages/Landing.page';
import LoginPage from './pages/Login.page';
import SignUpPage from './pages/Signup.page';
import AdminPage from "./pages/Admin.page.jsx";
import AdminEventsPage from "./pages/AdminEvents.page.jsx";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  }, {
    path: '/signup',
    element: <SignUpPage />,
  }, {
    path: '/admin',
    element: <AdminEventsPage />,
  }, {
    path: '/admin/events',
    element: <AdminEventsPage />
  }, {
    path: '/admin/users',
    element: <AdminEventsPage />
  }, {
    path: '/admin/competitions',
    element: <AdminEventsPage />
  }, {
    path: '/admin/attempts',
    element: <AdminEventsPage />
  }, {
    path: '/admin/questions',
    element: <AdminEventsPage />
  }, {
    path: '/admin/settings',
    element: <AdminEventsPage />
  }, {
    path: '/admin/builder',
    element: <AdminEventsPage />
  }, {
    path: '/events',
    element: <AdminEventsPage />
  }, {
    path: '/competitions',
    element: <AdminEventsPage />
  }, {
    path: '/attempts',
    element: <AdminEventsPage />
  }, {
    path: '/settings',
    element: <AdminEventsPage />
  }, {
    path: '/',
    element: <LandingPage />,
  }
]);

const Router = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default Router
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from './pages/Landing.page';
import LoginPage from './pages/Login.page';
import SignUpPage from './pages/Signup.page';
import AdminEventsPage from "./pages/AdminEvents.page.jsx";
import AdminUsersPage from "./pages/AdminUsers.page.jsx";
import AdminCompetitionsPage from "./pages/AdminCompetitions.page.jsx";

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
    element: <AdminUsersPage />
  }, {
    path: '/admin/competitions',
    element: <AdminCompetitionsPage />
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
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from './pages/Landing.page';
import LoginPage from './pages/Login.page';
import SignUpPage from './pages/Signup.page';
import AdminEventsPage from "./pages/AdminEvents.page.jsx";
import AdminUsersPage from "./pages/AdminUsers.page.jsx";
import AdminCompetitionsPage from "./pages/AdminCompetitions.page.jsx";
import AdminQuestionsPage from "./pages/AdminQuestions.page.jsx";
import BuilderPage from "./pages/Builder.page.jsx";
import UserEventsPage from "./pages/UserEvents.page.jsx";
import LiveCompetitionPage from "./pages/LiveCompetition.page.jsx";

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
    element: <AdminQuestionsPage />
  }, {
    path: '/admin/settings',
    element: <AdminEventsPage />
  }, {
    path: '/builder',
    element: <BuilderPage />
  }, {
    path: '/events',
    element: <UserEventsPage />
  }, {
    path: '/attempts',
    element: <UserEventsPage />
  }, {
    path: '/settings',
    element: <UserEventsPage />
  }, {
    path: '/competition/live/*',
    element: <LiveCompetitionPage />
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
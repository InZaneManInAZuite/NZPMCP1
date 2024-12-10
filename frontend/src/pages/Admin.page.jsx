import { useEffect, useContext } from "react";
import AdminLanding from "../components/AdminLanding/AdminLanding";
import { useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";

const AdminPage = () => {

  const navigate = useNavigate();

  const { isAdmin } = useContext(UserContext);

  useEffect (() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [navigate, isAdmin]);


  return (
    <AdminLanding />
  );
}

export default AdminPage;
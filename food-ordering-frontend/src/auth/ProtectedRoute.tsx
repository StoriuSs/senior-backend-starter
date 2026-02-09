import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";

const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoading) {
    return null;
  }

  if (isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;

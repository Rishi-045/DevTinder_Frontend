import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((store) => store?.auth?.isAuthenticated);
  const isAuthChecked = useSelector((store) => store.auth.isAuthChecked);

  if (!isAuthChecked) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Loader from "../common/Loader";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((store) => store?.auth?.isAuthenticated);
  const isAuthChecked = useSelector((store) => store.auth.isAuthChecked);

  if (!isAuthChecked) return <Loader />;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;

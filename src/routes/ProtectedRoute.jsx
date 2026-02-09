import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(store => store?.auth?.isAuthenticated);
  console.log(isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace/>;
};

export default ProtectedRoute

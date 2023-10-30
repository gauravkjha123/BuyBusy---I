import { Navigate } from "react-router-dom";
import { useAuthContext } from "../authContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();
  if (user) {
    return (<>{children}</>);
  }
  return Navigate({to:"/signIn"});
};

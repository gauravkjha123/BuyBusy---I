import { Navigate } from "react-router-dom";
import { useAuthContext } from "../authContext";

export const IsloggedIn = ({ children }) => {
  const { user } = useAuthContext();
  if (user) {
    return Navigate({to:"/"})
  }
  return (<>{children}</>);
};

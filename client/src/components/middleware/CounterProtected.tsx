import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

/** CounterProtected route wrapper
 *  Prevents access to auth pages if already logged in
 */

const CounterProtected = (): React.ReactElement => {
  const currentUser = useContext(AuthContext);

  return currentUser ? <Navigate to="/" replace={true} /> : <Outlet />;
};

export default CounterProtected;

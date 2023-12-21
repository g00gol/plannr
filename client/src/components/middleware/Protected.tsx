import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

/** Protected route wrapper
 *  If authorized, return an outlet that will render child elements
 *  If not, return element that will navigate to login page
 */

const Protected = (): React.ReactElement => {
  const currentUser = useContext(AuthContext);

  return currentUser ? <Outlet /> : <Navigate to='/signin' replace={true} />;
};

export default Protected;
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { MiddlewareProps } from '../../types/MiddlewareTypes';

/** Protected route wrapper
 *  If authorized, return an outlet that will render child elements
 *  If not, return element that will navigate to login page
 */

const Protected = (props: MiddlewareProps): React.ReactElement => {
  const currentUser = useContext(AuthContext);

  return currentUser ? <>{props.children}</> : <Navigate to='/signin' replace={true} />;
};

export default Protected;
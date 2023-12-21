import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { MiddlewareProps } from '../../types/MiddlewareTypes';

/** Protected route wrapper
 *  If authorized, render child element
 *  If not, return element that will navigate to login page
 */

const Protected = (props: MiddlewareProps): React.ReactElement => {
  const currentUser = useContext(AuthContext);

  return currentUser ? <>{props.children}</> : <Navigate to='/signin' replace={true} />;
};

export default Protected;
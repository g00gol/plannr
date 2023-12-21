import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { checkoobcode } from '../../api/auth';
import { MiddlewareProps } from '../../types/MiddlewareTypes';

/** Reset Protected route wrapper
 *  Users that have not requested to remember pw should not be able to access pw
 */

const ResetProtected = (props: MiddlewareProps): React.ReactElement => {
	const [searchParams] = useSearchParams();
    const [isValid, setIsValid] = React.useState<boolean>(true);

    useEffect(() => {
        console.log(searchParams);
        const check = async () => {
            try {
                const mode = searchParams.get('mode');
                if (!mode || mode != 'resetPassword') throw new Error('Invalid mode');

                const oobCode = searchParams.get('oobCode');
                if(!oobCode) throw new Error('No oobCode found');

                const result = await checkoobcode(oobCode!);
                if(!result) setIsValid(false);
            } catch (error: any) {
                console.log(error);
                setIsValid(false);
            }
        }
        check();
    } , []);

    return isValid ? <>{props.children}</> : <Navigate to='/' replace={true} />;
};

export default ResetProtected;
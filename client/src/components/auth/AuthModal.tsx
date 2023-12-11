import React from "react";
import { Link } from "react-router-dom";
import { AuthModalProps } from "../../types/AuthModalTypes";
const AuthModal = (props: AuthModalProps): React.ReactElement => {
	return (
		<div className="absolute top-0 left-0 bg-white opacity-90 h-screen w-1/2 flex flex-wrap justify-center content-center z-50 inset-y-0 right-0 duration-75 ">
			<div className="h-2/4 w-2/4">
                <Link to="/">X</Link>
                {props.children}
			</div>
		</div>
	);
}

export default AuthModal;

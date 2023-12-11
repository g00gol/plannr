import React from "react";
import { AuthModalProps } from "../../types/AuthModalTypes";
import { Link } from "react-router-dom";
const AuthModal = (props: AuthModalProps): React.ReactElement => {
	return (
		<div className="absolute top-0 left-0 bg-white opacity-90 h-screen w-screen flex flex-wrap justify-center content-center z-50">
			<div className="h-2/4 w-2/4">
                <Link to="/">X</Link>
                {props.children}
			</div>
		</div>
	);
}

export default AuthModal;

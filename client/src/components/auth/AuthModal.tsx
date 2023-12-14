import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { AuthModalProps } from "../../types/AuthModalTypes";

const AuthModal = (props: AuthModalProps): React.ReactElement => {
	window.onbeforeunload = () => {
		document.body.classList.remove("load-slide");
		document.body.classList.add("unload-slide");
	}

	return (
		<div className="absolute top-0 left-0 opacity-100 h-screen w-screen z-40 load-slide ">
			<div className="absolute top-0 left-0 bg-white opacity-90 h-screen w-1/2 flex flex-wrap justify-center content-center z-50 inset-y-0 right-0 duration-75 load-slide">
				<div className="h-2/4 w-2/4">
									<Link to="/" className="text-base back-link">&lt; Back to plannr</Link>
									{props.children}
				</div>
			</div>
		</div>
	);
}

export default AuthModal;

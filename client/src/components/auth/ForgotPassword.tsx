import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetpassword } from "../../api/auth";
import "../../styles/auth.scss";

function ForgotPassword(): React.ReactElement {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const doResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		const email = (document.getElementById("email") as HTMLInputElement).value;
		try {
			// TODO: VALIDATION
			await resetpassword(email);
			navigate("/signin");
		} catch (error: any) {
			console.log(`Error: ${error.message}`);
			setError(error.message);
		}
	};
	return (
		<div className="content-container auth">
			<div className="forgot-container">
				<form className="forgot-form" onSubmit={doResetPassword}>
					<label>
						<input
							className="input"
							id="email"
							type="email"
							placeholder="email"
						/>
					</label>
					{error && <span className="input-error">{error}</span>}
					<button className="login-button" type="submit">
						Send Email
					</button>
					<Link to="/signin">Cancel</Link>
				</form>
			</div>
		</div>
	);
}

export default ForgotPassword;

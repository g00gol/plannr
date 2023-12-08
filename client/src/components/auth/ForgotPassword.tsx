import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetpassword } from "../../api/auth";

const ForgotPassword = (): React.ReactElement => {
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
		<form onSubmit={doResetPassword}>
			<label>
				<input
					id="email"
					type="email"
					placeholder="email"
				/>
			</label>
			{error && <span className="input-error">{error}</span>}
			<button type="submit">
				Send Email
			</button>
			<Link to="/signin">Cancel</Link>
		</form>
	);
}

export default ForgotPassword;

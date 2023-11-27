import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../../styles/auth.scss";
import { confirmresetpassword } from "../../api/auth.js";

function ResetPassword(): React.ReactElement {
	const [searchParams, setSearchParams] = useSearchParams();
	console.log('hi')
	const doResetPassword = (e) => {
		const oobCode = searchParams.get("oobCode");
		console.log(oobCode)
		e.preventDefault();
		const password = document.getElementById("password").value;
		confirmresetpassword(oobCode, password);
	};
	return (
		<div className="content-container auth">
			<div className="forgot-container">
				<form className="forgot-form" onSubmit={doResetPassword}>
					<label>
						<input
							className="input"
							id="password"
							type="password"
							placeholder="password"
						/>
					</label>
					<button className="login-button" type="submit">
						Reset Password
					</button>
				</form>
			</div>
		</div>
	);
}

export default ResetPassword;

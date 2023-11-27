import React, { useEffect, useState } from "react";
import { signin } from "../../api/auth.js";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.scss";

function Signin(): React.ReactElement {
	const [checked, setChecked] = useState(false);
	const [error, setError] = useState('');
	const [forgot, setForgot] = useState(false);
	const navigate = useNavigate();

	const doSignIn = async (e) => {
		e.preventDefault();
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		try {
			// TODO: VALIDATION
			await signin(email, password);
			navigate('/');
		} catch (e) {
			console.log(`Error: ${e.message}`);
			setError(e.message);
		}
	};
	return (
		<div className='content-container auth'>
			<div className="auth-container">
				<div className="auth-buttons">
					<Link to="/signin">
						<button className="signin">Sign In</button>
					</Link>
					<Link to="/signup">
						<button className="signup">Sign Up</button>
					</Link>
				</div>
				<form className="auth-form" onSubmit={doSignIn}>
					<label>
						<input
							className="input"
							id="email"
							type="email"
							placeholder="email"
						/>
					</label>
					<label>
						<input
							className="input"
							id="password"
							type="password"
							placeholder="password"
						/>
					</label>
					{	error && 
						<span className="input-error">{error}</span>
					}
					<button className="login-button" type="submit">
						Login
					</button>
					<label>
						<input
							type="checkbox"
							checked={checked}
							name="remember"
							onChange={() => setChecked(!checked)}
						/>{" "}
						Remember me
						<Link
							to="/forgot"
							style={{
								textAlign: "right",
								display: "inline-block",
								float: "right",
							}}
						>
							Forgot Password
						</Link>
					</label>
					{/* <div class="divider">or</div> */}
				</form>
			</div>
		</div>
	);
}

export default Signin;

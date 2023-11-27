import React, { useEffect, useState } from "react";
import { signup } from "../../api/auth.js";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.scss";

function Signup(): React.ReactElement {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const doSignUp = async (e) => {
		e.preventDefault();
		const email = document.getElementById("email").value;
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;
		try {
			// TODO: VALIDATION
			await signup(email, username, password);		
			navigate('/signin');
		} catch(e) {
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
				<form className="auth-form" onSubmit={doSignUp}>
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
							id="username"
							type="username"
							placeholder="username"
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
						<span className='input-error'>{error}</span>
					}
					<button className="login-button" type="submit">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Signup;

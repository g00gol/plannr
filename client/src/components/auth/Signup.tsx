import React, { useEffect, useState } from "react";
import { signup } from "../../api/auth.js";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.scss";

function Signup(): React.ReactElement {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const doSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		const email = (document.getElementById("email") as HTMLInputElement).value;
		const username = (document.getElementById("username") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement).value;
		try {
			// TODO: VALIDATION
			await signup(email, username, password);		
			navigate('/signin');
		} catch(error: any) {
			console.log(`Error: ${error.message}`);
			setError(error.message);
		}
	};

	return (
		<div>
			<div>
				<div>
					<Link to="/signin">
						<button>Sign In</button>
					</Link>
					<Link to="/signup">
						<button>Sign Up</button>
					</Link>
				</div>
				<form onSubmit={doSignUp}>
					<label>
						<input
							id="email"
							type="email"
							placeholder="email"
						/>
					</label>
					<label>
						<input
							id="username"
							type="username"
							placeholder="username"
						/>
					</label>
					<label>
						<input
							id="password"
							type="password"
							placeholder="password"
						/>
					</label>
					{	error && 
						<span>{error}</span>
					}
					<button type="submit">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Signup;

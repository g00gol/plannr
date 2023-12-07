import React, { useEffect, useState } from "react";
import { signin } from "../../api/auth.js";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.scss";

const Signin = (): React.ReactElement => {
	const [checked, setChecked] = useState(false);
	const [error, setError] = useState('');
	const [forgot, setForgot] = useState(false);
	const navigate = useNavigate();

	const doSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		const email = (document.getElementById("email") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement).value;
		try {
			// TODO: VALIDATION
			await signin(email, password);
			navigate('/');
		} catch (error: any) {
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
				<form onSubmit={doSignIn}>
					<label>
						<input
							id="email"
							type="email"
							placeholder="email"
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

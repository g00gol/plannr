import { TextField } from '@mui/material';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../App.css';
import { signup } from "../../api/auth.js";
import logo from '../../assets/logo_cropped.png';

const Signup = (): React.ReactElement => {
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
		<div className="flex flex-col items-center justify-center">
			<img src={logo} alt="logo" className="w-1/4 h-1/4 mb-4 rounded-full" />
			<h1 className="text-3xl font-bold"> Sign Up </h1>
			<form onSubmit={doSignUp}>
				<TextField
					id="email"
					type="email"
					label="Email"
					placeholder="email@address.com"
					variant="outlined"
					required
					autoFocus
					fullWidth
					margin="normal"
				/>
				<TextField
					id="username"
					type="text"
					label="Username"
					placeholder="username"
					variant="outlined"
					required
					fullWidth
					margin="normal"
				/>
				<TextField
					id="password"
					type="password"
					label="Password"
					placeholder="Password"
					variant="outlined"
					required
					fullWidth
					margin="normal"
				/>
				<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
					Create Account
				</button>
				<div>
					Already have an account? <Link to="/signin" className="login-link">Sign in</Link>
				</div>
			</form>
			{	error &&
				<span className="text-red-500 py-2">{error}</span>
			}
		</div>
	);
}

export default Signup;

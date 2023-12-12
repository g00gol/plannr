import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../api/auth.js";

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
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-xl font-bold"> Sign In </h1>
			<form onSubmit={doSignIn}>
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
					id="password"
					type="password"
					label="Password"
					placeholder="Password"
					variant="outlined"
					required
					fullWidth
					margin="normal"
				/>
				{	error && 
					<span>{error}</span>
				}
				<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
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
						className="pl-20 hover:underline text-blue-700 hover:text-blue-800 transition duration-150 ease-in-out"
					>
						Forgot Password
					</Link>
				</label>
				<div>
					Don't have an account? <Link to="/signup" className="hover:underline text-blue-700 hover:text-blue-800 transition duration-150 ease-in-out">Sign up</Link>
				</div>
			</form>
		</div>
	);
}

export default Signin;

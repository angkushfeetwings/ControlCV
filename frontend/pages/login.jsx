import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const formSubmission = async e => {
		e.preventDefault();

		if (!email && !password) {
			return window.alert("Please validate all the fields");
		}

		try {
			const res = await fetch(`${process.env.LOCAL_URL}/user/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ email, password }),
			});
			const data = await res.json();

			window.alert(data.message);
			if (data.success) {
				router.push("/");
				setEmail("");
				setPassword("");
			}
		} catch (error) {
			window.alert(error);
		}
	};

	return (
		<section className="text-white bg-slate-800 body-font relative min-h-screen">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col text-center w-full mb-8">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">Login</h1>
				</div>
				<div className="lg:w-1/2 md:w-2/3 mx-auto">
					<form className="flex flex-wrap -m-2" onSubmit={formSubmission}>
						<div className="p-2 w-full">
							<div className="relative">
								<label htmlFor="email" className="leading-7 text-sm text-white">
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</div>
						</div>
						<div className="p-2 w-full">
							<div className="relative">
								<label htmlFor="password" className="leading-7 text-sm text-white">
									Password
								</label>
								<input
									type="password"
									id="password"
									name="password"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
						</div>
						<div className="w-full flex justify-between flex-col sm:flex-row mt-2 mb-5">
							<p
								className="cursor-pointer underline"
								onClick={() => router.push("/signup")}
							>
								Sign-up instead
							</p>
							{/* <p
								className="cursor-pointer mt-2 sm:mt-0"
								onClick={() => router.push("/signup")}
							>
								Forgot password
							</p> */}
						</div>
						<div className="p-2 w-full">
							<button
								className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
								type="submit"
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;

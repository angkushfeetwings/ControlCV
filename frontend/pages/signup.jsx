import { useState } from "react";
import { useRouter } from "next/router";

const Signup = () => {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const formSubmission = async e => {
		e.preventDefault();

		if (!name && !email && !password && !confirmPassword) {
			return window.alert("Please fill in all the fields");
		}

		if (password !== confirmPassword) {
			return window.alert("The passwords fields are not matching");
		}

		try {
			const res = await fetch(`${process.env.LOCAL_URL}/user/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ name, email, password, confirmPassword }),
			});
			const data = await res.json();

			window.alert(data.message);
			setName("");
			setEmail("");
			setPassword("");
			setConfirmPassword("");
			router.push("/");
		} catch (error) {
			window.alert(error);
		}
	};

	return (
		<section className="text-white bg-slate-800 body-font relative min-h-screen">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col text-center w-full mb-8">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">Sign Up</h1>
				</div>
				<div className="lg:w-1/2 md:w-2/3 mx-auto">
					<form className="flex flex-wrap -m-2" onSubmit={formSubmission}>
						<div className="p-2 w-full">
							<div className="relative">
								<label htmlFor="name" className="leading-7 text-sm text-white">
									Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									value={name}
									onChange={e => setName(e.target.value)}
								/>
							</div>
						</div>
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
						<div className="p-2 w-full">
							<div className="relative">
								<label
									htmlFor="confirmPassword"
									className="leading-7 text-sm text-white"
								>
									Confirm Password
								</label>
								<input
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									value={confirmPassword}
									onChange={e => setConfirmPassword(e.target.value)}
								/>
							</div>
						</div>
						<p
							className="cursor-pointer mt-2 mb-5 underline"
							onClick={() => router.push("/login")}
						>
							Login instead
						</p>
						<div className="p-2 w-full">
							<button
								className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
								type="submit"
							>
								Sign up
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Signup;

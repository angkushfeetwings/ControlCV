import { useRouter } from "next/router";

const Navbar = ({ user }) => {
	const router = useRouter();

	return (
		<>
			<header className="text-white body-font bg-slate-600">
				<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
					<a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
						<span className="ml-3 text-xl">ControlCV</span>
					</a>
					<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
						<a
							className="mr-5 hover:text-gray-300 cursor-pointer"
							onClick={() => router.push("/")}
						>
							Home
						</a>
						<a
							className="mr-5 hover:text-gray-300 cursor-pointer"
							onClick={() => router.push("/courses")}
						>
							Courses
						</a>
						<a
							className="mr-5 hover:text-gray-300 cursor-pointer"
							onClick={() => router.push("/roadmaps")}
						>
							Roadmaps
						</a>
						<a
							className="mr-5 hover:text-gray-300 cursor-pointer"
							onClick={() => router.push("/contact")}
						>
							Contact
						</a>
						<a
							className="mr-5 hover:text-gray-300 cursor-pointer"
							onClick={() => router.push("/dashboard")}
						>
							Dashboard
						</a>
					</nav>
					{!user && (
						<button
							className="inline-flex items-center bg-indigo-600 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-700 rounded text-base mt-4 md:mt-0"
							onClick={() => router.push("/login")}
						>
							Login / Signup
						</button>
					)}
				</div>
			</header>
		</>
	);
};

export default Navbar;

import { useState } from "react";
import { useRouter } from "next/router";
import Courses from "../components/Home/Courses";

const Dashboard = ({ user }) => {
	const router = useRouter();
	const [showFields, setShowFields] = useState(false);
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);

	const formSubmission = async e => {
		e.preventDefault();
		if (name === user.name && email === user.email) {
			return;
		}

		try {
			const res = await fetch(`${process.env.LOCAL_URL}/user/update`, {
				method: "PUT",
				credentials: "include",
				body: JSON.stringify({ name, email }),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			window.alert(data.message);
		} catch (error) {
			window.alert(error);
		}
	};

	return (
		<section className="min-h-screen bg-slate-800 text-white px-4">
			<div className="flex items-center align-center flex-col">
				<h1 className="text-2xl font-bold pt-12">Hello {user.name}</h1>
				<button
					className="mt-5 inline-flex text-gray-700 font-bold bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
					onClick={() => setShowFields(!showFields)}
					type="button"
				>
					Change user credentials
				</button>
			</div>
			{showFields && (
				<div className="lg:w-1/2 md:w-2/3 mx-auto">
					<form className="flex flex-wrap my-5" onSubmit={formSubmission}>
						<div className="p-2 w-full">
							<div className="relative">
								<label htmlFor="name" className="leading-7 text-sm text-gray-600">
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
								<label htmlFor="email" className="leading-7 text-sm text-gray-600">
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
						<div className="p-2 w-full mt-3">
							<button
								className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
								type="submit"
							>
								Update info
							</button>
						</div>
					</form>
				</div>
			)}
			{user.role === "admin" && (
				<div className="flex flex-col items-center align-center gap-6 mt-12">
					<button
						className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
						type="button"
						onClick={() => router.push("/admin/add-course")}
					>
						Add Course
					</button>
					<button
						className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
						type="button"
						onClick={() => router.push("/admin/add-roadmap")}
					>
						Add Roadmap
					</button>
				</div>
			)}
			<Courses data={user.courses} user={{ user }} />
		</section>
	);
};

export async function getServerSideProps(context) {
	const cookie = context.req.cookies.token || null;
	const res = await fetch(`${process.env.LOCAL_URL}/user`, {
		credentials: "include",
		headers: { "Content-Type": "application/json", cookie },
	});
	const data = await res.json();

	if (data.success) {
		return {
			props: {
				success: true,
				user: data.user,
				message: data.message,
			},
		};
	} else {
		return {
			redirect: {
				permanent: false,
				destination: "/login",
			},
		};
	}
}

export default Dashboard;

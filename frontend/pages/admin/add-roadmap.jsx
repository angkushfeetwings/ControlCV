import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddCourse = () => {
	const router = useRouter();
	const [url, setUrl] = useState("");
	const [courseName, setCourseName] = useState("");

	const fetchUser = async () => {
		try {
			const res = await fetch(`${process.env.LOCAL_URL}/user`, {
				credentials: "include",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			if (data.user && data.user.role !== "admin") {
				router.push("/");
			} else if (!data.user) {
				router.push("/");
			}
		} catch (error) {
			router.push("/");
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const formSubmission = async e => {
		e.preventDefault();

		if (!url && !courseName) {
			return window.alert("Please fill in all the fields");
		}

		try {
			const res = await fetch(`${process.env.LOCAL_URL}/roadmap/add`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ url, courseName }),
			});
			const data = await res.json();

			window.alert(data.message);
			// setUrl("");
			// setCourseName("");
		} catch (error) {
			window.alert(error);
		}
	};

	return (
		<section className="text-white bg-slate-800 body-font relative min-h-screen">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col text-center w-full mb-8">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">
						Add Roadmap
					</h1>
				</div>
				<div className="lg:w-1/2 md:w-2/3 mx-auto">
					<form className="flex flex-wrap -m-2" onSubmit={formSubmission}>
						<div className="p-2 w-full">
							<div className="relative">
								<label htmlFor="url" className="leading-7 text-sm text-white">
									Link to roadmap
								</label>
								<input
									type="text"
									id="url"
									name="url"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									value={url}
									onChange={e => setUrl(e.target.value)}
								/>
							</div>
						</div>
						<div className="p-2 w-full">
							<div className="relative">
								<label
									htmlFor="courseName"
									className="leading-7 text-sm text-white"
								>
									Enter Language
								</label>
								<input
									type="text"
									id="courseName"
									name="courseName"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									value={courseName}
									onChange={e => setCourseName(e.target.value)}
								/>
							</div>
						</div>
						<div className="p-2 w-full mt-8">
							<button
								className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
								type="submit"
							>
								Add Roadmap
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default AddCourse;

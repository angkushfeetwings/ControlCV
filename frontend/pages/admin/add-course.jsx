import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddCourse = () => {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [language, setLanguage] = useState("");

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

		if (!title && !description && !language && !category) {
			return window.alert("Please fill in all the fields");
		}

		try {
			const res = await fetch(`${process.env.LOCAL_URL}/course/create`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ title, description, language, category }),
			});
			const data = await res.json();

			window.alert(data.message);
			setTitle("");
			setDescription("");
			setLanguage("");
			setCategory("");
		} catch (error) {
			window.alert(error);
		}
	};

	return (
		<section className="text-white bg-slate-800 body-font relative min-h-screen">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col text-center w-full mb-8">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">Add Course</h1>
				</div>
				<div className="lg:w-1/2 md:w-2/3 mx-auto">
					<form className="flex flex-wrap -m-2" onSubmit={formSubmission}>
						<div className="p-2 w-full">
							<div className="relative">
								<label htmlFor="title" className="leading-7 text-sm text-white">
									Title
								</label>
								<input
									type="text"
									id="title"
									name="title"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									value={title}
									onChange={e => setTitle(e.target.value)}
								/>
							</div>
						</div>
						<div className="p-2 w-full">
							<div className="relative">
								<label
									htmlFor="description"
									className="leading-7 text-sm text-white"
								>
									Description
								</label>
								<input
									type="text"
									id="description"
									name="description"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									value={description}
									onChange={e => setDescription(e.target.value)}
								/>
							</div>
						</div>
						<div className="p-2 w-full">
							<div className="relative">
								<label htmlFor="category" className="leading-7 text-sm text-white">
									Category
								</label>
								<input
									type="text"
									id="category"
									name="category"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									value={category}
									onChange={e => setCategory(e.target.value)}
								/>
							</div>
						</div>
						<div className="p-2 w-full">
							<div className="relative">
								<label htmlFor="language" className="leading-7 text-sm text-white">
									Language
								</label>
								<input
									type="text"
									id="language"
									name="language"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									value={language}
									onChange={e => setLanguage(e.target.value)}
								/>
							</div>
						</div>
						<div className="p-2 w-full mt-8">
							<button
								className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
								type="submit"
							>
								Add Course
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default AddCourse;

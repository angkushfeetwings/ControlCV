import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddResource = () => {
	const router = useRouter();
	const [url, setUrl] = useState("");
	const [platform, setPlatform] = useState("");
	const [description, setDescription] = useState("");
	const [author, setAuthor] = useState("");

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

		if (!url && !description && !platform && !author) {
			return window.alert("Please fill in all the fields");
		}

		try {
			const res = await fetch(
				`${process.env.LOCAL_URL}/course/${router.query.id}/add-resource`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify({ url, description, platform, author }),
				},
			);
			const data = await res.json();

			window.alert(data.message);
			setUrl("");
			setPlatform("");
			setDescription("");
			setAuthor("");
		} catch (error) {
			window.alert(error);
		}
	};

	return (
		<section className="text-white bg-slate-800 body-font relative min-h-screen">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col text-center w-full mb-8">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">
						Add Resource
					</h1>
				</div>
				<div className="lg:w-1/2 md:w-2/3 mx-auto">
					<form className="flex flex-wrap -m-2" onSubmit={formSubmission}>
						<div className="p-2 w-full">
							<div className="relative">
								<label htmlFor="url" className="leading-7 text-sm text-white">
									Enter link to resource
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
									htmlFor="description"
									className="leading-7 text-sm text-white"
								>
									Enter a small description for the course
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
								<label htmlFor="platform" className="leading-7 text-sm text-white">
									Platform
								</label>
								<input
									type="text"
									id="platform"
									name="platform"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									value={platform}
									onChange={e => setPlatform(e.target.value)}
									placeholder="e.g. You-tube, udemy"
								/>
							</div>
						</div>
						<div className="p-2 w-full">
							<div className="relative">
								<label htmlFor="author" className="leading-7 text-sm text-white">
									Enter Author name
								</label>
								<input
									type="text"
									id="author"
									name="author"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									value={author}
									onChange={e => setAuthor(e.target.value)}
								/>
							</div>
						</div>
						<div className="p-2 w-full mt-8">
							<button
								className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
								type="submit"
							>
								Add Resource
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default AddResource;

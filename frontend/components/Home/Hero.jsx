import { useRouter } from "next/router";

const Hero = () => {
	const router = useRouter();
	return (
		<main className="min-h-screen flex flex-col items-start justify-center gap-2 pl-4 sm:pl-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-300">
			<h1 className="text-white text-3xl title-font font-medium mb-3">Title</h1>
			<p className="max-w-3xl mb-8 text-lg text-white">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error doloremque vitae
				odit quo. Rem, praesentium cum corrupti iste totam nemo expedita eaque dolorum
				veritatis accusantium quasi qui molestias nam dolorem!
			</p>
			<div className="flex justify-center">
				<button
					className="inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg"
					onClick={() => router.push("/courses")}
				>
					Courses
				</button>
				<button
					className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
					onClick={() => router.push("/roadmaps")}
				>
					Roadmaps
				</button>
			</div>
		</main>
	);
};

export default Hero;

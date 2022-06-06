import { useRouter } from "next/router";
import RoadmapCard from "../RoadmapCard";

const Roadmaps = ({ data }) => {
	const router = useRouter();
	return (
		<div className="text-white bg-slate-800 body-font py-20">
			<h1 className="text-4xl text-center">Roadmaps</h1>
			<div className="flex mt-4 justify-center">
				<div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex mb-4"></div>
			</div>
			<div className="container px-5 py-5 mx-auto">
				<div className="flex flex-wrap gap-12 justify-center items-center">
					{data &&
						data.map((roadmap, index) => <RoadmapCard key={index} roadmap={roadmap} />)}
				</div>
				<div className="w-full flex items-center justify-center mt-12">
					<button
						className="inline-flex text-black font-bold bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
						onClick={() => router.push("/roadmaps")}
					>
						See more roadmaps
					</button>
				</div>
			</div>
		</div>
	);
};

export default Roadmaps;

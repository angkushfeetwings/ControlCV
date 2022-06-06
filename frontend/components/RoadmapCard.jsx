const RoadmapCard = ({ roadmap, user }) => {
	return (
		<div className="p-4 w-72 flex flex-col text-center items-center bg-slate-600 rounded">
			<div className="w-32 h-32 inline-flex items-center justify-center rounded-full text-indigo-500 mb-5 flex-shrink-0">
				<img
					src={`/icons/${roadmap.courseName.toLowerCase()}.svg`}
					alt="content"
					className="w-full"
					style={{ objectFit: "contain" }}
				/>
			</div>
			<div className="flex-grow">
				<h2 className="text-white text-lg title-font font-medium mb-3">
					{roadmap.courseName}
				</h2>
				<a
					type="button"
					href={roadmap.url}
					rel="noopener noreferrer"
					target="_blank"
					className="flex mx-auto mt-6 text-black font-bold bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded align-center justify-center cursor-pointer"
				>
					Visit
				</a>
			</div>
		</div>
	);
};

export default RoadmapCard;

import RoadmapCard from "../components/RoadmapCard";

const Roadmap = data => {
	return (
		<section className="text-white bg-slate-800 body-font min-h-screen">
			<div className="px-5 py-8 mx-auto">
				<div className="text-center mb-20">
					<h1 className="text-center font-bold text-3xl">Roadmaps</h1>
					<div className="flex mt-6 justify-center">
						<div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
					</div>
				</div>
				<div className="flex flex-wrap items-center justify-center gap-6">
					{data.success && data.roadmaps.length > 0 ? (
						data.roadmaps.map(roadmap => (
							<RoadmapCard key={roadmap._id} roadmap={roadmap} user={data.user} />
						))
					) : (
						<h1 className="font-bold text-2xl">
							No roadmaps available yet, stay tuned
						</h1>
					)}
				</div>
			</div>
		</section>
	);
};

export async function getServerSideProps(context) {
	const cookie = context.req.cookies.token || null;
	const res = await fetch(`${process.env.LOCAL_URL}/roadmap/`);
	const data = await res.json();
	const userRes = await fetch(`${process.env.LOCAL_URL}/user`, {
		credentials: "include",
		headers: { "Content-Type": "application/json", cookie },
	});
	const userData = await userRes.json();

	if (data.success) {
		return {
			props: {
				roadmaps: data.roadmap,
				user: userData,
				success: data.success,
				numberOfRoadmaps: data.numberOfRoadmaps,
				message: data.message,
			},
		};
	} else {
		return {
			props: {
				success: data.success,
				message: data.message,
				roadmaps: [],
			},
		};
	}
}

export default Roadmap;

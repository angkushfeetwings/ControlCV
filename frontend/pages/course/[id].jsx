import ResourceCard from "../../components/ResourceCard";

const Course = data => {
	return (
		<section className="text-white bg-slate-800 body-font min-h-screen">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-wrap -mx-4 -my-8 items-center justify-center gap-6">
					{data.success && data.resources.length > 0 ? (
						data.resources.map(resource => (
							<ResourceCard key={resource._id} resource={resource} />
						))
					) : (
						<h1 className="font-bold text-2xl">
							No resources available yet, stay tuned
						</h1>
					)}
				</div>
			</div>
		</section>
	);
};

export async function getServerSideProps(context) {
	const res = await fetch(`${process.env.LOCAL_URL}/course/${context.params.id}/resources`);
	const data = await res.json();

	if (data.success) {
		return {
			props: {
				resources: data.resources,
				success: data.success,
				message: data.message,
			},
		};
	} else {
		return {
			props: {
				success: data.success,
				message: data.message,
			},
		};
	}
}

export default Course;

import Developers from "../components/Home/Developers";
import Hero from "../components/Home/Hero";
import Courses from "../components/Home/Courses";
import Roadmaps from "../components/Home/Roadmaps";

export default function Home({ courses, roadmaps, user }) {
	return (
		<>
			<Hero />
			<Courses data={courses} user={user} />
			<Roadmaps data={roadmaps} />
			<Developers />
		</>
	);
}

export async function getServerSideProps(context) {
	const cookie = context.req.cookies.token || null;
	const courseResponse = await fetch(`${process.env.LOCAL_URL}/course?items=3`);
	const courseData = await courseResponse.json();
	const roadmapResponse = await fetch(`${process.env.LOCAL_URL}/roadmap?items=3`);
	const roadmapData = await roadmapResponse.json();
	const userRes = await fetch(`${process.env.LOCAL_URL}/user`, {
		credentials: "include",
		headers: { "Content-Type": "application/json", cookie },
	});
	const userData = await userRes.json();

	if (courseData.success && roadmapData.success) {
		return {
			props: {
				courses: courseData.courses,
				roadmaps: roadmapData.roadmap,
				user: userData,
				success: true,
				numberOfCourses: courseData.numberOfCourses,
				numberOfRoadmaps: roadmapData.numberOfRoadmaps,
				message: "Fetched all results successfully",
			},
		};
	} else {
		return {
			props: {
				success: false,
				message: "Unable to fetch results",
			},
		};
	}
}

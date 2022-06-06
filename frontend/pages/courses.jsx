import CourseCard from "../components/CourseCard";

const Courses = data => {
	return (
		<section className="text-white bg-slate-800 body-font min-h-screen">
			<div className="px-5 py-8 mx-auto">
				<h1 className="text-center font-bold text-3xl">Courses</h1>
				<div className="flex mt-6 justify-center">
					<div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex mb-12"></div>
				</div>
				<div className="flex flex-wrap items-center justify-evenly sm:-m-4 -mx-4 -mb-10 -mt-4 gap-3">
					{data.success && data.courses.length > 0 ? (
						data.courses.map(course => (
							<CourseCard key={course._id} course={course} user={data.user} />
						))
					) : (
						<h1 className="font-bold text-2xl">No courses available yet, stay tuned</h1>
					)}
				</div>
			</div>
		</section>
	);
};

export async function getServerSideProps(context) {
	const cookie = context.req.cookies.token || null;
	const res = await fetch(`${process.env.LOCAL_URL}/course/`);
	const data = await res.json();
	const userRes = await fetch(`${process.env.LOCAL_URL}/user`, {
		credentials: "include",
		headers: { "Content-Type": "application/json", cookie },
	});
	const userData = await userRes.json();

	if (data.success) {
		return {
			props: {
				courses: data.courses,
				user: userData,
				success: data.success,
				numberOfCourses: data.numberOfCourses,
				message: data.message,
			},
		};
	} else {
		return {
			props: {
				success: data.success,
				data: null,
				user: null,
				message: data.message,
			},
		};
	}
}

export default Courses;

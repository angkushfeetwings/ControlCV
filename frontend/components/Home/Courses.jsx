import { useRouter } from "next/router";
import CourseCard from "../CourseCard";

const Courses = ({ data, user }) => {
	const router = useRouter();
	return (
		<div className="text-gray-600 bg-slate-800 body-font py-20">
			<h1 className="text-4xl text-center text-white">Courses</h1>
			<div className="flex mt-4 justify-center">
				<div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex mb-4"></div>
			</div>
			<div className="container px-5 py-5 mx-auto">
				<div className="flex flex-wrap items-center justify-evenly sm:-m-4 -mx-4 -mb-10 -mt-4 gap-3">
					{data &&
						data.map((course, index) => (
							<CourseCard key={index} course={course} user={user} />
						))}
				</div>
				<div className="w-full flex items-center justify-center mt-12">
					<button
						className="inline-flex text-black font-bold bg-indigo-400 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
						onClick={() => router.push("/courses")}
					>
						See more courses
					</button>
				</div>
			</div>
		</div>
	);
};

export default Courses;

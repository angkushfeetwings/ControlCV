import { useRouter } from "next/router";

const CourseCard = ({ course, user }) => {
	const router = useRouter();

	return (
		<div className="p-4 w-72 mb-6 bg-slate-600 rounded">
			<div className="rounded-lg h-40 overflow-hidden">
				<img
					alt="content"
					className="object-cover object-center h-full w-full"
					src={`/icons/${course.language.toLowerCase()}.svg`}
					style={{ objectFit: "contain" }}
				/>
			</div>
			<h2 className="text-xl font-medium title-font text-white mt-5 text-center">
				{course.title}
			</h2>
			<p className="text-base leading-relaxed text-gray-400 mt-2 text-center">
				{course.description}
			</p>
			<button
				type="button"
				className="flex mx-auto mt-6 text-black font-bold bg-indigo-400 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded"
				onClick={() => router.push(`/course/${course._id}`)}
			>
				Visit
			</button>
			{user && user.user && user.user.role === "admin" && (
				<button
					type="button"
					className="mt-4 flex mx-auto text-gray-700 font-bold bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded"
					onClick={() => router.push(`/admin/${course._id}/add-resource`)}
				>
					Update
				</button>
			)}
		</div>
	);
};

export default CourseCard;

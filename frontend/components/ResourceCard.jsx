const ResourceCard = resource => {
	const { platform, description, author, url } = resource.resource;
	return (
		<div className="py-8 px-4 w-full lg:w-1/2 bg-slate-600">
			<div className="h-full flex items-start">
				<div className="flex-grow">
					<h1 className="title-font text-xl font-medium text-white mb-3">{platform}</h1>
					<p className="leading-relaxed text-gray-300 mb-5">{description}</p>

					<a
						href={url}
						rel="noopener noreferrer "
						target="_blank"
						className="block mb-5 text-blue-200"
					>
						Go to course
					</a>
					<a className="inline-flex items-center">
						<span className="flex-grow flex flex-col">
							<span className="title-font font-medium text-white">{author}</span>
						</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default ResourceCard;

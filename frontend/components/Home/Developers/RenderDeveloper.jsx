const RenderDeveloper = ({ developer }) => {
	const { name, skills, socialMedia } = developer;
	return (
		<div className="p-4 sm:w-96 w-80 bg-slate-600 rounded">
			<div className="bg-opacity-75 pt-8 pb-16 rounded-lg overflow-hidden text-center relative">
				<div className="flex justify-center my-4">
					<svg
						width="100"
						height="100"
						fill="currentColor"
						className="bi bi-person-circle"
						viewBox="0 0 16 16"
					>
						<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
						<path
							fillRule="evenodd"
							d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
						/>
					</svg>
				</div>
				<h1 className="title-font text-2xl font-medium text-white mb-5">{name}</h1>
				{skills.map((skill, index) => (
					<p key={index} className="leading-relaxed mb-1">
						{skill}
					</p>
				))}
				<div className="text-center leading-none flex justify-center absolute bottom-0 left-0 right-0 w-full py-4">
					<div className="">
						<div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row items-center">
							<span className="inline-flex flex-wrap sm:ml-auto sm:mt-0 justify-center sm:justify-start">
								{socialMedia.twitter && (
									<a
										href={socialMedia.twitter}
										target="_blank"
										rel="noopener noreferrer"
										className="cursor-pointer ml-3 text-gray-500"
									>
										<svg
											fill="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-5 h-5"
											viewBox="0 0 24 24"
										>
											<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
										</svg>
									</a>
								)}
								{socialMedia.github && (
									<a
										href={socialMedia.github}
										target="_blank"
										rel="noopener noreferrer"
										className="cursor-pointer ml-3 text-gray-500"
									>
										<svg
											width={20}
											height={20}
											fill="currentColor"
											enableBackground="new 0 0 28 27.311"
											viewBox="0 0 28 27.311"
										>
											<path d="M28,14c0-7.732-6.268-14-14-14S0,6.268,0,14c0,6.221,4.061,11.488,9.674,13.311c0.767-0.235,0.803-0.702,0.803-0.702s0-1.383,0-2.661c-0.843,0.155-1.89,0.157-2.271,0.157c-0.464,0-2.009-0.386-2.689-2.132c-0.68-1.746-1.947-1.916-1.947-2.225s0.278-0.371,0.278-0.371s0.17,0,0.927,0c0.757,0,1.514,1.267,2.04,2.04s1.792,0.927,2.411,0.927c0.347,0,0.885-0.175,1.294-0.329c0.167-1.082,0.792-1.896,0.792-1.896c-6.243-0.556-6.397-5.223-6.397-7.046c0-1.823,1.484-3.616,1.484-3.616s-0.719-2.04,0.185-3.709c1.947,0.015,3.894,1.483,3.894,1.483S12.238,6.676,14,6.676s3.523,0.556,3.523,0.556s1.947-1.468,3.894-1.483c0.904,1.669,0.185,3.709,0.185,3.709s1.484,1.792,1.484,3.616c0,1.823-0.155,6.49-6.397,7.046c0,0,0.834,1.082,0.834,2.411s0,4.08,0,4.08s0.035,0.466,0.803,0.702C23.939,25.488,28,20.221,28,14z" />
										</svg>
									</a>
								)}
								{socialMedia.instagram && (
									<a
										href={socialMedia.instagram}
										target="_blank"
										rel="noopener noreferrer"
										className="cursor-pointer ml-3 text-gray-500"
									>
										<svg
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-5 h-5"
											viewBox="0 0 24 24"
										>
											<rect
												width="20"
												height="20"
												x="2"
												y="2"
												rx="5"
												ry="5"
											></rect>
											<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
										</svg>
									</a>
								)}
								{socialMedia.linkedIn && (
									<a
										href={socialMedia.linkedIn}
										target="_blank"
										rel="noopener noreferrer"
										className="cursor-pointer ml-3 text-gray-500"
									>
										<svg
											fill="currentColor"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="0"
											className="w-5 h-5"
											viewBox="0 0 24 24"
										>
											<path
												stroke="none"
												d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
											></path>
											<circle cx="4" cy="4" r="2" stroke="none"></circle>
										</svg>
									</a>
								)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RenderDeveloper;

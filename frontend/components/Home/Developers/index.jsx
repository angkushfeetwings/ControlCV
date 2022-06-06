import RenderDeveloper from "./RenderDeveloper";

const developers = [
	{
		name: "Angkush Sahu",
		skills: ["Mern Stack", "Programmer", "Blockchain enthusiast"],
		socialMedia: {
			github: "https://github.com/angkushsahu",
			linkedIn: "https://www.linkedin.com/in/angkush-sahu-0409311bb/",
			instagram: "https://www.instagram.com/angkush_sahu/",
		},
	},
	{
		name: "Kishan Poddar",
		skills: ["Mern Stack", "Programmer"],
		socialMedia: {
			github: "https://github.com/KishanPoddar",
			linkedIn: "https://www.linkedin.com/in/kishan-poddar-b350b01b1/",
			instagram: "https://www.instagram.com/_._virtualdj_._/",
		},
	},
	{
		name: "Ariyan Kashyap",
		skills: ["Programmer", "Frontend Developer", "Blockchain Developer"],
		socialMedia: {
			github: "https://github.com/VeNoM000001",
			linkedIn: "https://www.linkedin.com/in/ariyan-kashyap-1683541a1/",
			instagram: "https://www.instagram.com/cat_man099/",
		},
	},
];

const Developers = () => {
	return (
		<div className="text-white bg-slate-800 body-font py-20">
			<h1 className="text-4xl text-center">Developers</h1>
			<div className="flex mt-4 justify-center">
				<div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex mb-12"></div>
			</div>
			<div className="container px-5 py-5 mx-auto">
				<div className="flex flex-wrap -m-4 justify-center items-center gap-8">
					{developers.map((developer, index) => (
						<RenderDeveloper key={index} developer={developer} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Developers;

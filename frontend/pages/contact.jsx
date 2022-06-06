import { useState } from "react";

const Contact = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const formSubmission = async e => {
		e.preventDefault();

		if (!email && !name && !message) {
			return window.alert("Please validate all the fields");
		}

		try {
			const res = await fetch(`${process.env.LOCAL_URL}/contact/send-mail`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ email, messageBody: message, name }),
			});
			const data = await res.json();

			window.alert(data.message);
			setEmail("");
			setMessage("");
			setName("");
		} catch (error) {
			window.alert(error);
		}
	};

	return (
		<section className="text-white bg-slate-800 body-font relative min-h-screen">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col text-center w-full mb-8">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">Contact Us</h1>
				</div>
				<div className="lg:w-1/2 md:w-2/3 mx-auto">
					<form className="flex flex-wrap -m-2" onSubmit={formSubmission}>
						<div className="p-2 sm:w-1/2 w-full">
							<div className="relative">
								<label htmlFor="name" className="leading-7 text-sm text-white">
									Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									value={name}
									onChange={e => setName(e.target.value)}
								/>
							</div>
						</div>
						<div className="p-2 sm:w-1/2 w-full">
							<div className="relative">
								<label htmlFor="email" className="leading-7 text-sm text-white">
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</div>
						</div>
						<div className="p-2 w-full">
							<div className="relative">
								<label htmlFor="message" className="leading-7 text-sm text-white">
									Message
								</label>
								<textarea
									id="message"
									name="message"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
									value={message}
									onChange={e => setMessage(e.target.value)}
								></textarea>
							</div>
						</div>
						<div className="p-2 w-full">
							<button
								className="flex mx-auto text-black font-bold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
								type="submit"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Contact;

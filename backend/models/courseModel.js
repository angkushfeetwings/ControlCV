const { Schema, model, SchemaTypes } = require("mongoose");

const courseSchema = new Schema({
	title: { type: String, required: [true, "Please enter course title"] },
	description: { type: String, required: [true, "Please enter course description"] },
	category: { type: String, required: [true, "Please mention a category"] },
	rating: { type: Number },
	numberOfResources: { type: Number, default: 0 },
	language: { type: String, required: [true, "Please enter the programming language used"] },
	resources: [
		{
			url: { type: String, required: [true, "Please enter the resource url"] },
			platform: { type: String, required: [true, "Please enter the resource platform"] },
			description: { type: String, required: [true, "Please add a little about the course"] },
			author: { type: String, default: "anonymous" },
		},
	],
	roadmap: { type: SchemaTypes.ObjectId, ref: "roadmap" },
});

module.exports = model("course", courseSchema);

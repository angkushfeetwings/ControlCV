const { Schema, model, SchemaTypes } = require("mongoose");

const roadmapSchema = new Schema({
	url: { type: String, required: [true, "Please enter a url for the roadmap"] },
	courseId: { type: SchemaTypes.ObjectId, ref: "course" },
	courseName: { type: String, required: [true, "Please enter the name of the course"] },
});

module.exports = model("roadmap", roadmapSchema);

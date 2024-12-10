import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("QuizQuestionModel", schema);
export default model;
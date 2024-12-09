import mongoose from "mongoose";
import schema from "./schema.js";


const model = mongoose.model("QuizAttempts", schema);
export default model;

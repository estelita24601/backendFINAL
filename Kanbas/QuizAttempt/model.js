import mongoose from "mongoose";
import schema from "./schema";


const model = mongoose.model("QuizAttempts", schema);
export default model;

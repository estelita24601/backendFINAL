import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quizID: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    courseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    score: { type: Number, min: 0, max: 100 }, // Added validation for score
    answers: { type: Array, default: [] }, // Added answers field
    timestamp: { type: Date, default: Date.now }, // Mongoose will parse ISO 8601 string automatically
    attempt: { type: Number, required: true, default: 1 }, // Added default for attempt
  },
  { collection: "quizAttempts" }
);

export default schema;

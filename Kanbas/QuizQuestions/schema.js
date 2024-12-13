import mongoose from "mongoose";

const quizQuestionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizModel",
      required: true,
    },
    // course: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "CourseModel",
    //   required: true,
    // },
    title: String,
    type: {
      type: String,
      enum: ["true-false", "multiple-choice", "fill-blanks"],
      default: "multiple-choice",
    },
    points: { type: Number, default: 100 },
    prompt: { type: String},
    choices: { value: mongoose.Schema.Types.Mixed }, //could be [String] or [Boolean]
    solution: { value: mongoose.Schema.Types.Mixed }, //String, [String] or Boolean
  },
  { collection: "questions" }
);

export default quizQuestionSchema;

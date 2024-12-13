import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: String,
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel", required: true },
    quiz_type: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      default: "Graded Quiz"
    },
    total_points: { type: Number, default: 0 },
    assignment_group: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes"
    },
    shuffle_answers: { type: Boolean, default: true },
    time_limit_minutes: { type: Number, default: 20 },
    multi_attempts: { type: Boolean, default: false },
    num_attempts: { type: Number, default: 1 }, //NEW FIELD FOR QUIZ OBJECT
    show_answer: { type: Boolean, default: false },
    passcode: { type: String, default: "" },
    questions_one_by_one: { type: Boolean, default: true },
    webcam_required: { type: Boolean, default: false },
    lock_questions: { type: Boolean, default: false },
    due: String,
    available_from: String,
    available_until: String
  },
  { collection: "quizzes" }
);

export default schema;

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: String,
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    /*TODO:
    quiz_type: QuizType;
    total_points: number;
    assignment_group: AssignmentGroup;
    shuffle_answers: boolean;
    time_limit_minutes: number;
    multi_attempts: boolean;
    show_answer: boolean;
    passcode: string | null;
    questions_one_by_one: boolean;
    webcam_required: boolean;
    lock_questions: boolean;
    due: string | null;
    available_from: string | null;
    available_until: string | null;
    */
  },
  { collection: "quizzes" }
);
export default schema;

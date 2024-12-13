import mongoose from "mongoose";



// might need to add attempts to struct?!
const schema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizID: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  courseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, 
  score: Number,
  timestamp: { type: Date, default: Date.now },
  attempt: { type: Number, required: true },
},
{ collection: "quizAttempts" }
);

export default schema;


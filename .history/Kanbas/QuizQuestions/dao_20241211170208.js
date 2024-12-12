import model from "./model.js";
import mongoose from "mongoose";

export function getAllQuestions() {
  return model.find();
}

export function getQuizQuestions(quizId) {
  return model.find({ quiz: quizId });
}

// Updated to use course ObjectId
export function getQuestionsByCourse(courseId) {
  try {
    const objectId = new mongoose.Types.ObjectId(courseId);
    return model.find({ course: objectId });
  } catch (error) {
    console.error("Invalid course ID format:", error);
    return [];
  }
}

export function getQuestion(questionId) {
  return model.find({ _id: questionId });
}

export function newQuestion(question) {
  // Ensure course ID is converted to ObjectId when creating
  if (question.course) {
    question.course = new mongoose.Types.ObjectId(question.course);
  }
  return model.create(question);
}

export function updateQuestion(questionId, questionUpdates) {
  // Convert course ID to ObjectId if it's being updated
  if (questionUpdates.course) {
    questionUpdates.course = new mongoose.Types.ObjectId(
      questionUpdates.course
    );
  }
  return model.updateOne({ _id: questionId }, { $set: questionUpdates });
}

export function deleteQuestion(questionId) {
  return model.deleteOne({ _id: questionId });
}

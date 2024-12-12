import model from "./model.js";
import mongoose from "mongoose";

export function getAllQuestions() {
  return model.find();
}

export function getQuestionsByQuiz(quizId) {
  try {
    const objectId = new mongoose.Types.ObjectId(quizId);
    return model.find({ quiz: objectId });
  } catch (error) {
    console.error("Invalid quiz ID format:", error);
    return [];
  }
}

export function getQuestion(questionId) {
  return model.findById(questionId);
}

export function createQuestion(question) {
  if (question.quiz) {
    question.quiz = new mongoose.Types.ObjectId(question.quiz);
  }
  return model.create(question);
}

export function updateQuestion(questionId, questionUpdates) {
  return model.updateOne({ _id: questionId }, { $set: questionUpdates });
}

export function deleteQuestion(questionId) {
  return model.deleteOne({ _id: questionId });
}

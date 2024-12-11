import model from "./model.js";

export function getAllQuestions() {
    return model.find();
}

export function getQuizQuestions(quizId) {
    return model.find({ quiz: quizId });
}

export function getQuestion(questionId) {
    return model.find({ _id: questionId })
}

export function newQuestion(question) {
    return model.create(question);
}

export function updateQuestion(questionId, questionUpdates) {
    return model.updateOne({ _id: questionId }, { $set: questionUpdates });
}

export function deleteQuestion(questionId) {
    return model.deleteOne({ _id: questionId });
}
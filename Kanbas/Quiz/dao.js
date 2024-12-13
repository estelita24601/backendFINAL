import model from "./model.js";

export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}

export function getQuizzesByCourse(courseId) {
  console.log("courseId", courseId);
  const res = model.find({ course: courseId });
  return res;
}

export function createQuiz(courseId, quiz) {
  console.log(`Quiz DAO - createQuiz()`);
  delete quiz._id;
  const newQuiz = { ...quiz, course: courseId };
  console.log(`model.create - ${JSON.stringify(newQuiz, null, 2)}`)
  return model.create(newQuiz);
}

export function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, quizUpdates);
}

//double check
export function getQuizById(quiz_id) {
  console.log("getquizbyid - backend");
  return model.find({ _id: quiz_id });
}


export function getAllQuizzes() {
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~GETALLQUIZZES FUNCTION WOOOOOOOOOOOOOOO~~~~~~~~~~~~~~~~~~~~~~~~~~");
  return model.find();
}



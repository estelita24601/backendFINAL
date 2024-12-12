import * as dao from "./dao.js";
const API = "/api/quiz/questions";

function logHelper(reqType, url) {
  console.log(`QuizQuestions ${reqType} -\n\t${url}`);
}

export default function QuizQuestionsRoutes(app) {
  // Get ALL questions - passed test
  app.get(API, async (req, res) => {
    logHelper("GET", API);
    const allQuestions = await dao.getAllQuestions();
    res.json(allQuestions);
  });

  // Get questions by course
  app.get("/api/quiz/course/:courseId/questions", async (req, res) => {
    const { courseId } = req.params;
    logHelper("GET", `/api/quiz/course/${courseId}/questions`);
    const questions = await dao.getQuestionsByCourse(courseId);
    res.json(questions);
  });

  // Get all questions for a quiz - updated to include course filter
  app.get("/api/quiz/:qid/questions", async (req, res) => {
    const { qid } = req.params;
    const { courseId } = req.query; // Add courseId as query parameter
    logHelper("GET", `/api/quiz/${qid}/questions`);

    const quizQuestions = courseId
      ? await dao.getQuizQuestions(qid, courseId)
      : await dao.getQuizQuestions(qid);
    res.json(quizQuestions);
  });

  // Get a specific question - passed test
  app.get("/api/quiz/questions/:qqid", async (req, res) => {
    const { qqid } = req.params;
    logHelper("GET", `/api/quiz/questions/${qqid}`);
    const question = await dao.getQuestion(qqid);
    res.json(question);
  });

  // Create new question
  app.post(API, async (req, res) => {
    const question = req.body;
    logHelper("POST", API);
    const newQuestion = await dao.newQuestion(question);
    res.json(newQuestion);
  });

  // Update a question
  app.put("/api/quiz/questions/:qqid", async (req, res) => {
    const { qqid } = req.params;
    const question = req.body;
    logHelper("PUT", `/api/quiz/questions/${qqid}`);

    const result = await dao.updateQuestion(qqid, question);
    if (result.acknowledged) {
      res.status(204).send(`modified ${result.modifiedCount} question(s)`);
    } else {
      res
        .status(400)
        .send(`unable to acknowledge request to modify question ${qqid}`);
    }
  });

  // Delete a question
  app.delete("/api/quiz/questions/:qqid", async (req, res) => {
    const { qqid } = req.params;
    logHelper("DELETE", `/api/quiz/questions/${qqid}`);

    const result = await dao.deleteQuestion(qqid);
    if (result.acknowledged) {
      res.status(204).send(`deleted ${result.deletedCount} question(s)`);
    } else {
      res
        .status(400)
        .send(`unable to acknowledge request to delete question ${qqid}`);
    }
  });
}

import * as dao from "./dao.js";
const API = "/api/quiz/questions";

function logHelper(reqType, url) {
  console.log(`QuizQuestions ${reqType} -\n\t${url}`);
}

export default function QuizQuestionsRoutes(app) {
  // Get questions for a specific quiz
  app.get("/api/quiz/:qid/questions", async (req, res) => {
    try {
      const { qid } = req.params;
      logHelper("GET", `/api/quiz/${qid}/questions`);

      const questions = await dao.getQuestionsByQuiz(qid);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions for quiz" });
    }
  });

  // Get a specific question
  app.get("/api/questions/:qid", async (req, res) => {
    try {
      const { qid } = req.params;
      const question = await dao.getQuestion(qid);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch question" });
    }
  });

  // Create new question
  app.post("/api/quiz/:qid/questions", async (req, res) => {
    try {
      const { qid } = req.params;
      const question = {
        ...req.body,
        quiz: qid, // Associate question with quiz
      };
      const newQuestion = await dao.createQuestion(question);
      res.json(newQuestion);
    } catch (error) {
      res.status(500).json({ error: "Failed to create question" });
    }
  });

  // Update question
  app.put("/api/questions/:qid", async (req, res) => {
    try {
      const { qid } = req.params;
      const status = await dao.updateQuestion(qid, req.body);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Failed to update question" });
    }
  });

  // Delete question
  app.delete("/api/questions/:qid", async (req, res) => {
    try {
      const { qid } = req.params;
      const status = await dao.deleteQuestion(qid);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete question" });
    }
  });

  // Get all questions
  app.get("/api/questions", async (req, res) => {
    try {
      const questions = await dao.getAllQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });
}

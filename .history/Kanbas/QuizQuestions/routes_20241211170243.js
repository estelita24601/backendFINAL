import * as dao from "./dao.js";
const API = "/api/quiz/questions";

function logHelper(reqType, url) {
  console.log(`QuizQuestions ${reqType} -\n\t${url}`);
}

export default function QuizQuestionsRoutes(app) {
  // Get ALL questions
  app.get(API, async (req, res) => {
    try {
      logHelper("GET", API);
      const allQuestions = await dao.getAllQuestions();
      res.json(allQuestions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  // Get questions by course
  app.get("/api/quiz/course/:courseId/questions", async (req, res) => {
    try {
      const { courseId } = req.params;
      logHelper("GET", `/api/quiz/course/${courseId}/questions`);

      const questions = await dao.getQuestionsByCourse(courseId);
      if (!questions || questions.length === 0) {
        return res
          .status(404)
          .json({ message: "No questions found for this course" });
      }
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions for course" });
    }
  });

  // Get all questions for a quiz
  app.get("/api/quiz/:qid/questions", async (req, res) => {
    try {
      const { qid } = req.params;
      logHelper("GET", `/api/quiz/${qid}/questions`);

      const quizQuestions = await dao.getQuizQuestions(qid);
      if (!quizQuestions || quizQuestions.length === 0) {
        return res
          .status(404)
          .json({ message: "No questions found for this quiz" });
      }
      res.json(quizQuestions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz questions" });
    }
  });

  // Get a specific question
  app.get("/api/quiz/questions/:qqid", async (req, res) => {
    try {
      const { qqid } = req.params;
      logHelper("GET", `/api/quiz/questions/${qqid}`);

      const question = await dao.getQuestion(qqid);
      if (!question || question.length === 0) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch question" });
    }
  });

  // Create new question
  app.post(API, async (req, res) => {
    try {
      const question = req.body;
      logHelper("POST", API);

      const newQuestion = await dao.newQuestion(question);
      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(500).json({ error: "Failed to create question" });
    }
  });

  // Update a question
  app.put("/api/quiz/questions/:qqid", async (req, res) => {
    try {
      const { qqid } = req.params;
      const question = req.body;
      logHelper("PUT", `/api/quiz/questions/${qqid}`);

      const result = await dao.updateQuestion(qqid, question);
      if (result.acknowledged) {
        res.status(204).send();
      } else {
        res.status(400).json({ error: "Failed to update question" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update question" });
    }
  });

  // Delete a question
  app.delete("/api/quiz/questions/:qqid", async (req, res) => {
    try {
      const { qqid } = req.params;
      logHelper("DELETE", `/api/quiz/questions/${qqid}`);

      const result = await dao.deleteQuestion(qqid);
      if (result.acknowledged) {
        res.status(204).send();
      } else {
        res.status(400).json({ error: "Failed to delete question" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete question" });
    }
  });
}

import mongoose from "mongoose";
import * as attemptsDao from "./dao.js";

export default function AttemptRoutes(app) {
  // Find a specific user's attempt for a specific quiz
  app.get("/api/users/:uid/quizzes/:qid/attempt", async (req, res) => {
    const { uid, qid } = req.params;
    try {
      const attempt = await attemptsDao.findAttempt(
        mongoose.Types.ObjectId(uid), // Cast uid to ObjectId
        mongoose.Types.ObjectId(`${qid}`) // NO Cast qid to ObjectId test
      );
      if (attempt) {
        res.json(attempt);
      } else {
        res.status(404).send("Attempt not found");
      }
    } catch (error) {
      res.status(500).send(`Error finding attempt: ${error.message}`);
    }
  });

  // Update or create a specific user's attempt for a specific quiz
  app.put("/api/users/:uid/quizzes/:qid/attempt", async (req, res) => {
    const { uid, qid } = req.params;
    const { score, answers, timestamp, courseID, attempt } = req.body;

    // Validate the request body
    if (
      typeof score !== "number" ||
      (answers && !Array.isArray(answers)) ||
      !timestamp ||
      !courseID ||
      typeof attempt !== "number"
    ) {
      return res.status(400).send("Invalid or missing fields in request body");
    }

    const updatedAttempt = {
      quizID: mongoose.Types.ObjectId(qid), // Cast qid to ObjectId
      courseID: mongoose.Types.ObjectId(courseID), // Cast courseID to ObjectId
      score,
      answers: answers || [],
      timestamp: new Date(timestamp),
      attempt,
    };

    try {
      const result = await attemptsDao.replaceAttempt(
        mongoose.Types.ObjectId(uid), // Cast uid to ObjectId
        updatedAttempt
      );
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Attempt not found");
      }
    } catch (error) {
      res.status(500).send(`Error updating or creating attempt: ${error.message}`);
    }
  });

  // Get all attempts for a specific quiz
  app.get("/api/quizzes/:qid/attempts", async (req, res) => {
    const { qid } = req.params;
    try {
      const attempts = await attemptsDao.findAttemptsByQuiz(
        mongoose.Types.ObjectId(qid) // Cast qid to ObjectId
      );
      res.json(attempts);
    } catch (error) {
      res.status(500).send(`Error retrieving attempts for quiz: ${error.message}`);
    }
  });

  // Get all attempts made by a specific user
  app.get("/api/users/:uid/attempts", async (req, res) => {
    const { uid } = req.params;
    try {
      const attempts = await attemptsDao.findAttemptsByUser(
        mongoose.Types.ObjectId(uid) // Cast uid to ObjectId
      );
      res.json(attempts);
    } catch (error) {
      res.status(500).send(`Error retrieving attempts for user: ${error.message}`);
    }
  });

  // Fetch all quiz attempts from every user
  app.get("/api/quizAttempts", async (req, res) => {
    try {
      const quizAttempts = await attemptsDao.getAllQuizzesAttempts();
      res.json(quizAttempts);
    } catch (error) {
      res.status(500).send(`Error retrieving quiz attempts: ${error.message}`);
    }
  });
}

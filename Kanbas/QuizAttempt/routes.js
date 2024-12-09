import * as attemptsDao from "./dao.js"; 

export default function AttemptRoutes(app) {
  // Find a specific users attempt for a specific quiz
  app.get("/api/users/:uid/quizzes/:qid/attempt", async (req, res) => {
    const { uid, qid } = req.params;
    try {
      const attempt = await attemptsDao.findAttempt(uid, qid);
      if (attempt) {
        res.json(attempt);
      } else {
        res.status(404).send("Attempt not found");
      }
    } catch (error) {
      res.status(500).send(`Error finding attempt: ${error.message}`);
    }
  });

  // Creates a new attempt for a user
  app.post("/api/users/:uid/quizzes/:qid/attempt", async (req, res) => {
    const { uid, qid } = req.params;
    const quizAttempt = req.body;
    try {
      const newAttempt = await attemptsDao.createNewAttempt(uid, { quizID: qid, ...quizAttempt });
      res.status(201).json(newAttempt);
    } catch (error) {
      res.status(500).send(`Error creating new attempt: ${error.message}`);
    }
  });

  // Replace a users attempt for a specific quiz --- fosho for faculty use only... probably need to wrap in protected route? unles quiz offers multiple trys
  app.put("/api/users/:uid/quizzes/:qid/attempt", async (req, res) => {
    const { uid, qid } = req.params;
    const quizAttempt = req.body;
    try {
      const updatedAttempt = await attemptsDao.replaceAttempt(uid, { quizID: qid, ...quizAttempt });
      res.status(200).json(updatedAttempt);
    } catch (error) {
      res.status(500).send(`Error replacing attempt: ${error.message}`);
    }
  });

  // Get all attempts for a specific quiz -- still need this? idk
  app.get("/api/quizzes/:qid/attempts", async (req, res) => {
    const { qid } = req.params;
    try {
      const attempts = await attemptsDao.findAttemptsByQuiz(qid);
      res.json(attempts);
    } catch (error) {
      res.status(500).send(`Error retrieving attempts for quiz: ${error.message}`);
    }
  });

  // Get all attempts made by a specific user -------- maybe this should be filtered to faculty only to view specific users quiz history?
  app.get("/api/users/:uid/attempts", async (req, res) => {
    const { uid } = req.params;
    try {
      const attempts = await attemptsDao.findAttemptsByUser(uid);
      res.json(attempts);
    } catch (error) {
      res.status(500).send(`Error retrieving attempts for user: ${error.message}`);
    }
  });
}

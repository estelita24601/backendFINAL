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

  app.post("/api/users/:uid/quizzes/:qid/attempt", async (req, res) => {
    const { uid, qid } = req.params;
    const { score, answers, timestamp, courseID, attempt } = req.body;
  
    // Validate and normalize incoming payload
    if (
      typeof score !== "number" ||
      (answers && !Array.isArray(answers)) || // Ensure answers is an array if provided
      !timestamp || 
      !courseID ||
      typeof attempt !== "number"
    ) {
      return res.status(400).send("Invalid or missing fields in request body");
    }
  
    const quizAttempt = {
      quizID: qid,
      courseID,
      score,
      answers: answers || [], // Default to empty array if not provided
      timestamp: new Date(timestamp), // Ensure timestamp is a Date object
      attempt,
    };
  
    try {
      const newAttempt = await attemptsDao.createNewAttempt(uid, quizAttempt);
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

  // fetch all quiz attempts from every user?
  app.get("/api/quizAttempts", async (req, res) => {
    const quizAttempts = await attemptsDao.getAllQuizzesAttempts();  // ADD findAllQuizzes fucntion
    res.send(quizAttempts);
  });

}

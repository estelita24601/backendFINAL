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

  app.put("/api/users/:uid/quizzes/:qid/attempt", async (req, res) => {
    const { uid, qid } = req.params;
    const { score, answers, timestamp, courseID, attempt } = req.body;
  
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
      quizID: qid, // Ensure quizID is included
      courseID,
      score,
      answers: answers || [],
      timestamp: new Date(timestamp),
      attempt,
    };
  
    try {
      const result = await attemptsDao.replaceAttempt(uid, updatedAttempt);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Attempt not found");
      }
    } catch (error) {
      res.status(500).send(`Error updating attempt: ${error.message}`);
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

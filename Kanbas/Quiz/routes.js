import * as quizzesDao from "./dao.js";

export default function QuizRoutes(app) {
  app.delete("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const resultStatus = await quizzesDao.deleteQuiz(qid);
    if (resultStatus.acknowledged) {
      res.status(204).send(`deleted ${resultStatus.deletedCount} quizzes`);
    } else {
      res.status(500).send(`unable to acknowledge request to delete quiz with _id = ${qid}`);
    }
  });

  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    console.log(`Quiz Routes /api/courses/${cid}/quizzes`);

    const newQuiz = await quizzesDao.createQuiz(cid, req.body);
    console.log(`sending... ${JSON.stringify(newQuiz, null, 2)}`);

    res.send(newQuiz);
  });

  app.put("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const resultStatus = await quizzesDao.updateQuiz(qid, req.body);
    if (resultStatus.acknowledged) {
      res.status(204).send(`updated ${resultStatus.modifiedCount} quizzes`);
    } else {
      res.status(500).send(`unable to acknowledge request to update quiz with _id = ${qid}`);
    }
  });

  app.get("/api/Courses/:cid/Quizzes", async (req, res) => {
    const { cid } = req.params;
    const quizzes = await quizzesDao.getQuizzesByCourse(cid);
    //console.log("QUIZZZESSSSS OBJ ID?!?!?!?!??!_--------------------------------------", quizzes);
    console.log(`getQuizByCourse ${cid}\nresult = ${JSON.stringify(quizzes, null, 2)}`);
    res.json(quizzes);
  });

  //added
  app.get("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const quizzes = await quizzesDao.getQuizById(qid);
    console.log(`getQuizById ${qid}\nresult = ${JSON.stringify(quizzes, null, 2)}`);
    res.json(quizzes);
  });



  // fetch all quizzes
  app.get("/api/quizzes", async (req, res) => {
    console.log("~~~~~~~~~~~~~~~~~~~~GET QUIZZES IN ROUTES FILEEE WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO~~~~~~~~~!@#@#!@#@!#!@#!@");
    const quizzes = await quizzesDao.getAllQuizzes();  // ADD findAllQuizzes fucntion
    res.send(quizzes);
  });
}

import * as dao from "./dao.js";
const API = "/api/quiz/questions"

function logHelper(reqType, url) {
    console.log(`QuizQuestions ${reqType} -\n\t${url}`);
}

export default function QuizQuestionsRoutes(app) {
    //get ALL questions - passed test
    app.get(API, async (req, res) => {
        logHelper("GET", API);

        const allQuestions = await dao.getAllQuestions();
        res.json(allQuestions);
    });

    //get all questions for a quiz - passed test
    app.get("/api/quiz/:qid/questions", async (req, res) => {
        const { qid } = req.params;
        logHelper("GET", `/api/quiz/${qid}/questions`);

        const quizQuestions = await dao.getQuizQuestions(qid);
        res.json(quizQuestions);
    });

    //get a specific question - passed test
    app.get("/api/quiz/questions/:qqid", async (req, res) => {
        const { qqid } = req.params;
        logHelper("GET", `/api/quiz/questions/${qqid}`);

        const question = await dao.getQuestion(qqid);
        res.json(question);
    });

    //create new question
    app.post(API, async (req, res) => {
        const question = req.body;
        logHelper("POST", API);

        const newQuestion = await dao.newQuestion(question);
        response.json(newQuestion);
    });

    //update a question
    app.put("/api/quiz/questions/:qqid", async (req, res) => {
        const { qqid } = req.params;
        const question = req.body;
        logHelper("PUT", `/api/quiz/questions/${qqid}`);

        const result = await dao.updateQuestion(qqid, question);
        if (result.acknowledged) {
            res.status(204).send(`modified ${result.modifiedCount} question(s)`);
        } else {
            res.status(400).send(`unable to acknowledge request to modify question ${qqid}`);
        }
    });

    //delete a question
    app.delete("/api/quiz/questions/:qqid", async (req, res) => {
        const { qqid } = req.params;
        logHelper("DELETE", `/api/quiz/questions/${qqid}`);

        const result = await dao.deleteQuestion(qqid);
        if (result.acknowledged) {
            res.status(204).send(`deleted ${result.deletedCount} question(s)`);
        } else {
            res.status(400).send(`unable to acknowledge request to delete question ${qqid}`);
        }
    });
}
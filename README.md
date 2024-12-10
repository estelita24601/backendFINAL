# Quiz  API Documentation

- `qid` = quiz _id

- `cid` = course _id

- `uid` = user _id

- `qqid` = quiz question _id



| dao function name       | type   | route                                    | client | description/usages        |
| ----------------------- | ------ | ---------------------------------------- | ------ | ------------------------- |
| `deleteQuiz`            | DELETE | /api/quizzes/`:qid`                      |        |                           |
| `getQuizzesByCourse`    | GET    | /api/Courses/`:cid`/Quizzes              |        |                           |
| `createQuiz`            | POST   | /api/courses/`:cid`/quizzes              |        |                           |
| `updateQuiz`            | PUT    | /api/quizzes/`:qid`                      |        |                           |
| `getQuizById`           | GET    | /api/quizzes/`:qid`                      |        |                           |
| `createNewAttempt`      | POST   | /api/users/`:uid`/quizzes/`:qid`/attempt |        |                           |
| `findAttempt`           | GET    | /api/users/`:uid`/quizzes/`:qid`/attempt |        |                           |
| `replaceAttempt`        | PUT    | /api/users/`:uid`/quizzes/`:qid`/attempt |        |                           |
| `findAttemptsByQuiz`    | GET    | /api/quizzes/`:qid`/attempts             |        |                           |
| `findAttemptsByUser`    | GET    | /api/users/`:uid`/attempts               |        |                           |
| `getAllQuizzesAttempts` | GET    | /api/quizAttempts                        |        |                           |
| `getAllQuestions`       | GET    | /api/quiz/questions                      |        | get all questions in db   |
| `newQuestion`           | POST   | /api/quiz/questions                      |        | create a new question     |
| `getQuizQuestions`      | GET    | /api/quiz/`:qid`/questions               |        | get questions for a quiz  |
| `getQuestion`           | GET    | /api/quiz/questions/`:qqid`              |        | get a specific question   |
| `updateQuestion`        | PUT    | /api/quiz/questions/`:qqid`              |        | edit an existing question |
| `deleteQuestion`        | DELETE | /api/quiz/questions/`:qqid`              |        | delete a question         |

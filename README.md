# API Documentation

qid = quiz _id
cid = course _id
uid = user _id

| dao.js                   |                                   | client.ts |        | description/usages |
| ------------------------ | --------------------------------- | --------- | ------ | ------------------ |
| `deleteQuiz`             | /api/quizzes/:qid                 |           | DELETE |                    |
| `getQuizzesByCourse`     | /api/Courses/:cid/Quizzes         |           | GET    |                    |
| `createQuiz`             | /api/courses/:cid/quizzes         |           | POST   |                    |
| `updateQuiz`             | /api/quizzes/:qid                 |           | PUT    |                    |
| `getQuizById`            | /api/quizzes/:qid                 |           | GET    |                    |
|  `createNewAttempt` |   /api/users/:uid/quizzes/:qid/attempt   |           | POST   |                    |
| `findAttempt`      |/api/users/:uid/quizzes/:qid/attempt |           | GET    |                    |
| `replaceAttempt`   | /api/users/:uid/quizzes/:qid/attempt     |           | PUT    |                    |
| `findAttemptsByQuiz`          | /api/quizzes/:qid/attempts                     |           | GET    |                    |
| `findAttemptsByUser`          | /api/users/:uid/attempts                     |           | GET    |                    |
| `getAllQuizzesAttempts`          | /api/quizAttempts                      |           | GET    |                    |

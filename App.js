import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import "dotenv/config";
import EnrollmentsRoutes from "./Kanbas/Enrollments/routes.js";
import QuizRoutes from "./Kanbas/Quiz/routes.js";
import QuizAttemptRoutes from "./Kanbas/QuizAttempt/routes.js";
import QuizQuestionsRoutes from "./Kanbas/QuizQuestions/routes.js";


//does render.com re deploy when I commit this?
const CONNECTION_STRING =
    process.env.MONGO_CONNECTION_STRING ||
    "mongodb+srv://Cluster06842:supersecretpassword@kanbas.icn8v.mongodb.net/kanbas?retryWrites=true&w=majority&appName=Kanbas";

mongoose
    .connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB successfully!");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

app.use(express.json());
Lab5(app);
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
UserRoutes(app);
EnrollmentsRoutes(app);
QuizRoutes(app);
QuizAttemptRoutes(app);
QuizQuestionsRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

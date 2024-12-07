import Database from "../Database/index.js";
import * as dao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  app.delete("/api/enrollment/enroll/:courseId", (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    const userId = currentUser._id;
    dao.unenrollUserInCourse(userId, courseId);
    res.sendStatus(200);
  });

  app.post("/api/enrollment/enroll/:courseId", (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    const userId = currentUser._id;
    dao.enrollUserInCourse(userId, courseId);
    res.sendStatus(200);
  });
}


import db from "../Database/index.js";
import * as assignmentDao from "./dao.js";
// import * as assignmentDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    assignmentDao.deleteAssignment(aid);
    res.sendStatus(200);
  });

  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = assignmentDao.getAssignmentsByCourse(cid);
    res.json(assignments);
  });

  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = assignmentDao.createAssignment(cid, req.body);
    res.send(newAssignment);
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    assignmentDao.updateAssignment(aid, req.body);
    res.sendStatus(204);
  });
}

// push again
// export default function AssignmentRoutes(app) {
//   // delete module
//   app.delete("/api/assignments/:aid", (req, res) => {
//     const { aid } = req.params;
//     db.assignments = db.assignments.filter((a) => a._id !== aid);
//     res.sendStatus(200);
//   });

//   // get all assignments
//   app.get("/api/courses/:cid/assignments", (req, res) => {
//     const { cid } = req.params;
//     const assignments = db.assignments.filter((a) => a.course === cid);
//     res.json(assignments);
//   });

//   // create new module
//   app.post("/api/courses/:cid/assignments", (req, res) => {
//     const { cid } = req.params;
//     const newAssignment = {
//       ...req.body,
//       course: cid,
//       _id: new Date().getTime().toString(),
//     };
//     db.assignments.push(newAssignment);
//     res.send(newAssignment);
//   });

//   // update module
//   app.put("/api/assignments/:aid", (req, res) => {
//     const { aid } = req.params;
//     const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
//     db.assignments[assignmentIndex] = {
//       ...db.assignments[assignmentIndex],
//       ...req.body,
//     };
//     res.sendStatus(204);
//   });
// }

import * as assignmentsDao from "./dao.js";
import mongoose from "mongoose";

export default function AssignmentRoutes(app) {
  app.delete("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    await assignmentsDao.deleteAssignment(aid);
    res.sendStatus(200);
  });

  app.post("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    const newAssignment = await assignmentsDao.createAssignment(cid, req.body);
    res.json(newAssignment);
  });

  app.put("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    console.log("Update assignment:", aid, req.body);
    const assignmentUpdated = req.body;
    const sendStatus = await assignmentsDao.updateAssignment(
      aid,
      assignmentUpdated
    );
    res.send(sendStatus);
    // res.sendStatus(204);
  });

  app.get("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    const assignments = await assignmentsDao.getAssignmentsByCourse(cid);
    res.json(assignments);
  });

  // app.post(
  //   "/api/courses/:cid/assignments/AssignmentEditorNew",
  //   async (req, res) => {
  //     const { cid } = req.params;
  //     console.log("new assignment:", cid, req.body);
  //     const newAssignment = await assignmentsDao.createAssignment(
  //       cid,
  //       req.body
  //     );
  //     res.json(newAssignment);
  //   }
  // );

  // app.post(
  //   "/api/courses/:cid/assignments/AssignmentEditorNew",
  //   async (req, res) => {
  //     try {
  //       const { cid } = req.params;
  //       console.log("new assignment:", cid, req.body);

  //       if (!req.body.title) {
  //         return res
  //           .status(400)
  //           .json({ error: "Assignment title is required" });
  //       }

  //       const newAssignment = await assignmentsDao.createAssignment(
  //         cid,
  //         req.body
  //       );

  //       res.status(201).json(newAssignment); // 201 Created
  //     } catch (error) {
  //       console.error("Error creating assignment:", error);
  //       res.status(500).json({ error: "Internal server error" });
  //     }
  //   }
  // );

  app.post(
    "/api/courses/:cid/assignments/AssignmentEditorNew",
    async (req, res) => {
      console.log("AssignmentEditorNew: in routes", req.body);
      try {
        const { cid } = req.params;

        const assignment = {
          ...req.body,
          course: new mongoose.Types.ObjectId(cid), // 确保 course 是 ObjectId
        };

        console.log("Assignment passed to DAO:", assignment);

        const newAssignment = await assignmentsDao.createAssignment(assignment);
        res.status(201).json(newAssignment);
      } catch (error) {
        console.error("Error creating assignment:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );
}

import db from "../Database/index.js";
import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  // delete module
  app.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    modulesDao.deleteModule(mid);
    res.sendStatus(200);
  });

  // get all modules
  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = db.modules.filter((m) => m.course === cid);
    res.json(modules);
  });

  // create new module
  app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.modules.push(newModule);
    res.send(newModule);
  });

  // update module
  app.put("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    modulesDao.updateModule(moduleId, moduleUpdates);
    res.sendStatus(204);
  });
}

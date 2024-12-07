// import db from "../Database/index.js";
import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  // delete module
  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    // const mid = req.body.moduleId;
    const status = await modulesDao.deleteModule(moduleId);
    res.send(status);
  });

  // update module
  app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await modulesDao.updateModule(moduleId, moduleUpdates);
    res.send(status);
  });
}

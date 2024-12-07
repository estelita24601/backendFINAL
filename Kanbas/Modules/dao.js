// import Database from "../Database/index.js";
import model from "./model.js";

// import mongoose from "mongoose";

// export function findModulesForCourse(courseId) {
//   const { modules } = Database;
//   return modules.filter((module) => module.course === courseId);
// }

export function createModule(module) {
  delete module._id;
  return model.create(module);

  // const newModule = { ...module, _id: Date.now().toString() };
  // Database.modules = [...Database.modules, newModule];
  // return newModule;
}
export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId });
  // const { modules } = Database;
  // Database.modules = modules.filter((module) => module._id !== moduleId);
}

export function updateModule(moduleId, moduleUpdates) {
  return model.updateOne({ _id: moduleId }, moduleUpdates);
  // const { modules } = Database;
  // const module = modules.find((module) => module._id === moduleId);
  // Object.assign(module, moduleUpdates);
  // return module;
}

export function findModulesForCourse(courseId) {
  console.log("courseId", courseId);
  const res = model.find({ course: courseId });
  return res;
}

export function findAllModules() {
  return model.find();
}

// push for testing

import model from "./model.js";

// export const deleteAssignment = (aid) => {
//   db.assignments = db.assignments.filter((a) => a._id !== aid);
// };

export function deleteAssignment(assignmentId) {
  return model.deleteOne({ _id: assignmentId });
}

// export const getAssignmentsByCourse = (cid) => {
//   return db.assignments.filter((a) => a.course === cid);
// };

export function getAssignmentsByCourse(courseId) {
  console.log("courseId", courseId);
  const res = model.find({ course: courseId });
  return res;
}

// export const createAssignment = (cid, assignmentData) => {
//   const newAssignment = {
//     ...assignmentData,
//     course: cid,
//     _id: new Date().getTime().toString(),
//   };
//   db.assignments.push(newAssignment);
//   return newAssignment;
// };
export function createAssignment(assignment) {
  console.log("assignment in dao", assignment);
  delete assignment._id;
  return model.create(assignment);
}

// export const updateAssignment = (aid, updatedData) => {
//   const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
//   db.assignments[assignmentIndex] = {
//     ...db.assignments[assignmentIndex],
//     ...updatedData,
//   };
// };

export function updateAssignment(assignmentId, assignmentUpdates) {
  return model.updateOne({ _id: assignmentId }, assignmentUpdates);
}

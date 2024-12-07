import db from "../Database/index.js";

export const deleteAssignment = (aid) => {
  db.assignments = db.assignments.filter((a) => a._id !== aid);
};

export const getAssignmentsByCourse = (cid) => {
  return db.assignments.filter((a) => a.course === cid);
};

export const createAssignment = (cid, assignmentData) => {
  const newAssignment = {
    ...assignmentData,
    course: cid,
    _id: new Date().getTime().toString(),
  };
  db.assignments.push(newAssignment);
  return newAssignment;
};

export const updateAssignment = (aid, updatedData) => {
  const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
  db.assignments[assignmentIndex] = {
    ...db.assignments[assignmentIndex],
    ...updatedData,
  };
};

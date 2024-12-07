// import Database from "../Database/index.js";

// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;

//   enrollments.push({ _id: Date.now(), user: userId, course: courseId });
// }

// export function unenrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   Database.enrollments = enrollments.filter(
//     (enrollment) => enrollment.course !== courseId && enrollment.user == userId
//   );
// }

import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}
export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

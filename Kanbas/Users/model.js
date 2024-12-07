import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("UserModel", schema);
// const users = await model.find(); // No filter, fetches all documents
// console.log("All Users:", users);

export default model;

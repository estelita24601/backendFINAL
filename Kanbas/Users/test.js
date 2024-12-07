import mongoose from "mongoose";
import * as userDao from "./dao.js";

await mongoose.connect(
  "mongodb+srv://Cluster06842:supersecretpassword@kanbas.icn8v.mongodb.net/kanbas?retryWrites=true&w=majority&appName=Kanbas"
  //   "mongodb://127.0.0.1:27017/kanbas"
);

const allUsers = await userDao.findAllUsers();
console.log(allUsers);

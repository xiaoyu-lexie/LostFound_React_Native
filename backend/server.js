const app = require("./app");
const mongoose = require("mongoose");

const database =
  "mongodb+srv://xiaoyu:jyf120911@cluster0.rq5xrkv.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(database)
  .then(() => console.log("connect to database successfully!"));

app.listen(5003, () => console.log("Server is running"));

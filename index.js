const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const userRouters = require("./routes/userRoutes");
const userRoutersTest = require("./routes/userRoutesTest");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRouters);
app.use("/api/long", userRoutersTest);
// app.use("/api/auth", userRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/conversations", conversationRoutes);

mongoose
  .connect(process.env.MONGO_CONNECT_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => console.log(err.message));

const server = app.listen(port, () => {
  console.log("Server started on port:", port);
});

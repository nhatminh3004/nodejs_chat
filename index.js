const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

// app.use("/api/auth", userRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/conversations", conversationRoutes);

// mongoose
//   .connect(process.env.MONGO_CONNECT_LINK, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("database is connected");
//   })
//   .catch((err) => console.log(err.message));

const server = app.listen(process.env.PORT, () => {
    console.log("Server started on port:", process.env.PORT);
});


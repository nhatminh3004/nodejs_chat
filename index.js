const express = require("express");
const cors = require("cors");
const DichVu = require("./model/dichvuLongSchema");
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
// Function to generate sample data
function generateVirtualData() {
  const names = ["Dịch vụ X", "Dịch vụ Y", "Dịch vụ Z"];
  const urls = [
    "https://example.com/service-x",
    "https://example.com/service-y",
    "https://example.com/service-z",
  ];
  const statuses = ["Đang hoạt động", "Ngừng hoạt động", "Sắp ra mắt"];
  const prices = [19.99, 24.99, 39.99];
  const websites = [
    "https://company.com",
    "https://company.com/blog",
    "https://company.com/about",
  ];
  const socialnetworks = [
    { facebook: "https://www.facebook.com/service-x" },
    { facebook: "https://www.facebook.com/service-y" },
    { facebook: "https://www.facebook.com/service-z" },
  ];

  const data = [];
  for (let i = 0; i < 3; i++) {
    // Generate 3 sample documents
    data.push({
      name: names[i],
      url: urls[i],
      status: statuses[i],
      price: prices[i],
      website: websites[i],
      socialnetworks: socialnetworks[i],
    });
  }
  return data;
}
async function insertVirtualData() {
  try {
    const virtualData = generateVirtualData(); // Generate sample data
    await DichVu.insertMany(virtualData); // Insert data into collection
    console.log("Virtual data inserted successfully!");
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}
// insertVirtualData();

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

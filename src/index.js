import express from "express";
import * as dotenv from "dotenv";
//import cors from "cors";

dotenv.config();
const app = express();

const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use(allowCrossDomain);

app.get("/", (req, res) => {
  res.status(200).json({ data: { message: "GET Request" } });
});

app.post("/", (req, res) => {
  res.status(200).json({ data: { message: "POST request" } });
});

app.listen(process.env.PORT, () => {
  console.log(`Serer is running on porn ${process.env.PORT}`);
});

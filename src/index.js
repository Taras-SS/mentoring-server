import express from "express";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

const allowCrossDomain = (req, res, next) => {
  //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  //res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};

app.use(allowCrossDomain);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ data: { message: "GET request" } });
});

app.post("/", (req, res) => {
  res.status(200).json({ data: { message: "POST request" } });
});

app.get("/cookies-request", (req, res) => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  // date.setMinutes(date.getMinutes() + 1);
  const domain = "localhost";

  /** Native approach */
  // res.setHeader(
  //   "Set-Cookie",
  //   `ReadableCookie=readable-cookie-value; httpOnly=false; domain=${domain}; path=/; expires=${date}`
  // );

  res.cookie("ReadableCookie", "readable-cookie-value", {
    httpOnly: false,
    domain,
    expires: date,
    path: "/",
  });

  res.cookie("NotReadableCookie", "not-readable-cookie", {
    httpOnly: false,
    domain,
    expires: date,
    path: "/",
  });

  res.cookie("__Secure-Cookie", "cookie-value", {
    expires: date,
    domain,
    path: "/",
  });

  res.status(200).json({ data: { success: true } });
});

app.post("/cookies-request", (req, res) => {
  res.status(200).json({ data: { parsed_cookies: req.cookies } });
});

app.listen(process.env.PORT, () => {
  console.log(`Serer is running on porn ${process.env.PORT}`);
});

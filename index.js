import express from "express";
import bodyParser from "body-parser";
import { dbConnect } from "./Config/dbConnect.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import routes from "./app.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

dbConnect();

app.use(morgan("dev"));
app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Alvore Review Backend</title>
        <style>
          body {
            background: linear-gradient(to right, #4facfe, #00f2fe);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
          }
          h1 {
            font-size: 3rem;
            text-align: center;
            background-color: #ffffffaa;
            padding: 20px 40px;
            border-radius: 20px;
            color: #333;
            box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          }
        </style>
      </head>
      <body>
        <h1>🚀 Alvore Backend is Working! 🎉</h1>
      </body>
    </html>
  `);
});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(routes);

app.listen(PORT, () => {
    console.log(`ChecklistManagement Server is running on port ${PORT} ❤❤❤❤`);
});

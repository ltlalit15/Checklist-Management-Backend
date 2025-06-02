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
app.use('/uploads', express.static('uploads')); // serve uploaded images

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(routes);

app.listen(PORT, () => {
    console.log(`ChecklistManagement Server is running on port ${PORT} ❤❤❤❤`);
});

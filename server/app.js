import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import cors from "cors";
import salesRoutes from "./Routes/salesRoute.js";
import checkoutRoute from "./Routes/checkoutRoutes.js";
import contactRoute from "./Routes/contactRoute.js";
import updateProfileRoutes from "./Routes/updateUserRoute.js";

dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT || 8080;

connectDB();

app.use("/api", authRoutes);
app.use("/api", salesRoutes);
app.use("/api", checkoutRoute);
app.use("/api", contactRoute);
app.use("/api", updateProfileRoutes);

//Home Route

app.get("/", (req, res) => {
  res.send({
    message: "Server Running",
    PORT: process.env.PORT,
  });
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./Config/db");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const quizQuestionRoutes = require("./routes/quizQuestionRoutes");
const quizResultRoutes = require("./routes/quizResultRoutes");

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
dotenv.config();
connectDb();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/quiz-questions", quizQuestionRoutes);
app.use("/api/quiz-results", quizResultRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

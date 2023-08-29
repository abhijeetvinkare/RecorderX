const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true,
}));

const connectDB = require("./dbConfig/dbConfig");
connectDB();

// Import route files
const userRoutes = require("./routes/userRoutes");

// Use routes
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});



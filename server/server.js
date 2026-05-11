const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://jay-portfolio-abc.vercel.app",
    ],
    credentials: true,
  })
);
connectDB();
app.use(express.json());
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require("express");
const authRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/reviews")
const app = express();

require("dotenv").config();

//Allows the server to parse JSON
app.use(express.json());

app.use("/auth", authRoutes());
app.use("/reviews", reviewRoutes());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

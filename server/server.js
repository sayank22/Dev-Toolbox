const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api"); // ✅ correct path + file exists

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", apiRoutes); // ✅ apiRoutes must be a router

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

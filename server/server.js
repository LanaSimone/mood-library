const express = require("express");
const cors = require("cors");
const database = require("./db");
require("dotenv").config();


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Mood Library backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
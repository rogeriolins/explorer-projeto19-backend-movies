require("express-async-errors");

const express = require("express");

const app = express();

const PORT = 3333;
const serverStart = `\n\nThis server BackendMovies is running on port ${PORT}`;

// Server is active
app.listen(PORT, () => console.log(serverStart));
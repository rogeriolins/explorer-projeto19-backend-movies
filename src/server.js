require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");

const AppError = require("./utils/AppError");

const express = require("express");
// Include Routes the aplication
const routes = require("./routes");

// Run Create Database dbmovie.db
migrationsRun();

const app = express();
app.use(express.json());
app.use(routes);

// Add AppError for use in application
app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "Error",
            message: error.message
        });
    }
    console.log(error);
    return response.status(500).json({
        status: "Error",
        message: "Internal Server Error."
    })
})

const PORT = 3333;
const serverStart = `\n\nThis server BackendMovies is running on port ${PORT}`;

// Server is active
app.listen(PORT, () => console.log(serverStart));
// Hash para senha com BCrypt
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

const knex = require("../database/knex");

const sqliteConnection = require("../database/sqlite");

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        
        // const database = await sqliteConnection();
        // const checkUserExists = await knex("users")
        //     .where({ email })
        //     .first();
        
        //checkUserExists);
        
        // try {
            // if(checkUserExists !== undefined) {
                //     throw new AppError("This e-mail is in use!");
                // }
                
                passHashed = await hash(password, 8);
                
                
                console.log(name, email, password, passHashed);
                return;
          

            const insertUser = await knex("users").insert({
                name, email, password
            });

            return response.status(201).json("User inserted.");

        // } catch (error) {
        //     return response.status(error.statusCode).json({ message: error.message });
        // }

    }

}

module.exports = UsersController;
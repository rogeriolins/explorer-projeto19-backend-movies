// Hash para senha com BCrypt
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

const knex = require("../database/knex");

const sqliteConnection = require("../database/sqlite");
const { use } = require("../routes");

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const checkUserExists = await knex("users")
            .where({ email })
            .first();

        try {
            if(!!checkUserExists) {
                throw new AppError("This e-mail is in use!");
            }
                
            const passHashed = await hash(password, 8);          

            const insertUser = await knex("users").insert({
                name: name,
                email: email,
                password: passHashed
            });

            return response.status(201).json("User inserted.");            
        } catch (error) {
            return response.status(error.statusCode).json({ message: error.message });
        }

    }

    async update(request, response) {
        const { id } = request.params;
        const { name, email, password, password_old } = request.body

        try {
            // User exist?
            const userExist = await knex("users").where( { id } ).first();
            if(!userExist) {
               throw new AppError("This user does not exist!");
            }

            // Modify email user
            const userWithUpdateEmail = await knex("users").where({email}).first();
            if(userWithUpdateEmail && userWithUpdateEmail.id !== userExist.id) {
                throw new AppError("This email is already in use by another user!");
            }

            userExist.name = name ?? userExist.name;
            userExist.email = email ?? userExist.email;

            // Password inform and true
            if(password && !password_old){
                throw new AppError("You must enter your old password!");
            }

            if(password && password_old) {
                const checkOldPassWord = await compare(password_old, userExist.password);
                if(!checkOldPassWord) {
                    throw new AppError("The old password does not match!");
                }

                userExist.password = await hash(password, 8);
            }
            // Adjusting timezone is necessary
            const updatedUser = await knex("users")
                .where({id})
                .update({
                    name: userExist.name,
                    email: userExist.email,
                    password: userExist.password,
                    updated_at: knex.fn.now()
                });

            return response.status(200).json("User Updated.");
        } catch (error) {
            return response.status(error.statusCode).json( { message: error.message } );
        }
    }

}

module.exports = UsersController;
const AppError = require("../utils/AppError");

const knex = require("../database/knex");

class MoviesController {

    async create (request, response ) {
        const { user_id } = request.params;
        const { title, description, rating, tags } = request.body;

        // Insert Movies
        const [ movies_id ] = await knex("movies_notes").insert({
            user_id,
            title,
            description,
            rating
        })

        // Insert tags
        const tagsInsert = tags.map(tag => {
            return {
                "note_id": movies_id,
                "user_id": user_id,
                "name": tag
            }
        } );

        console.log(tagsInsert);

        await knex("movies_tags").insert( tagsInsert );

        return response.status(200).json("Movies and Tags Inserted.");

        // return response.status(200).json({
        //     "user_id": user_id,
        //     "title": title,
        //     "description": description,
        //     "rating": rating,
        //     "tags": tags
        // });
    }

    async delete (request, response) {
        const { id } = request.params;

        await knex("movies_notes").where({ id }).delete();

        return response.status(200).json("Movies deleted.")
    }
}

module.exports = MoviesController;
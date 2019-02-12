
//the database name is knex_db for this project
//when you start a new project change the migration table properties
// then run knex migrate: latest in command line

module.exports ={

  development: {
    client: 'pg',
    connection: {
      // change this if you change the database name
      database: 'knex_db',
      username: "jdenjo",
      password: "2383Bellevue"
    },
    migrations: {
      tableName: "migrations",
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
      
    }
  },
};
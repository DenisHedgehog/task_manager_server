var knex = require('knex')

class Database {

    connection() {
        this.knex = knex({
            client: 'mysql',
            connection: {
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'task_manager'
            }
        })
    }

    migrate() {

        var self = this

        this.knex.schema.hasTable('users').then(function (exists) {
            if (!exists) {
                return self.knex.schema.createTable('users', function (table) {
                    table.increments()
                    table.string('login', 100).unique().notNullable()
                    table.string('password', 100).notNullable()
                    table.timestamps()
                })
            }
        })

        this.knex.schema.hasTable('tasks').then(function (exists) {
            if (!exists) {
                return self.knex.schema.createTable('tasks', function (table) {
                    table.increments()
                    table.integer('parent_id').nullable()
                    table.integer('owner_id').notNullable()
                    table.string('name', 100).unique().notNullable()
                    table.text('description').nullable()
                    table.string('deadline').nullable()
                    table.boolean('finished').notNullable()
                    table.timestamps()
                })
            }
        })

    }

}

module.exports = Database
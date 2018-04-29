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
        this.knex.schema.createTable('users', function (table) {
            table.increments()
            table.string('login', 100).unique()
            table.string('password', 100)
            table.timestamps()
        })

        this.knex.schema.createTable('tasks', function (table) {
            table.increments()
            table.integer('parent_id')
            table.string('name', 100).unique()
            table.text('description')
            table.date('deadline')
            table.boolean('finished')
            table.timestamps()
        })

        // this.knex.schema.createTableIfNotExists('users', function (table) {
        //     table.increments()
        //     table.string('name', 100)
        //     table.string('last_name', 100)
        //     table.string('email', 120).unique()
        //     table.string('phone', 100)
        //     table.string('password', 150)
        //     table.string('secretKey', 100)
        //     table.timestamps()
        // })
    }

}

module.exports = Database
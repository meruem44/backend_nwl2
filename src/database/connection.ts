import knex from 'knex'
import { resolve } from 'path'

// Migrations - Controlam a versão do banco de dados

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true
})

export default db
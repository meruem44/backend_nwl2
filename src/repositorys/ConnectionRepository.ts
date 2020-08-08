import db from '../database/connection'
import Knex from 'knex'


class ConnectionRepository {

    public async createConnection(user_id: number) {
        try {
            const idConnection = await db('connections').insert({
                user_id
            })

            console.log(idConnection)

            if (idConnection.length < 0) {
                throw new Error('Erro to create connection ')
            }

        } catch (e) {
            console.log(e)
            throw new Error('Erro to create connection ')
        }
    }

    public async findConnection(): Promise<Number>{
        try {
            const totalConnections = await db('connections').count('* as total')

            const { total } = totalConnections[0]

            return total as Number

        } catch (e) {
            throw new Error('Erro to find total connection ')
        }
    }

}

export default ConnectionRepository
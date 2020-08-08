import db from '../database/connection'
import Knex from 'knex'

interface CreateUserDTO {
    name: string;
    avatar: string;
    whatssap: string;
    bio: string;
}

class UserRepository {
    private transaction: Knex.Transaction

    constructor(transaction: Knex.Transaction){
        this.transaction = transaction
    }


    public async insert({ name, avatar, whatssap, bio }: CreateUserDTO): Promise<number | null> {
        try {
            const insertedUserId = await this.transaction('users').insert({
                name,
                avatar,
                whatssap,
                bio
            })
    
            return insertedUserId[0] || null
        } catch(e) {
            throw new Error('Erro to insert to user')
        }
    }

}

export default UserRepository
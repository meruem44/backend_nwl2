import ConnectionRepository from '../repositorys/ConnectionRepository'

class CreateConnectionService {
    public async execute(user_id: number) {
        const connectionRepository = new ConnectionRepository()

        await connectionRepository.createConnection(user_id)
    }
}

export default CreateConnectionService
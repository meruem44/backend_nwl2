import ConnectionRepository from '../repositorys/ConnectionRepository'

class FindTotalConnectionService {
    public async execute() {
        const connectionRepository = new ConnectionRepository()

        const total = connectionRepository.findConnection()

        return total
    }
}

export default FindTotalConnectionService
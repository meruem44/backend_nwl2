import ClasseRepository from '../repositorys/ClasseRepository'
import convertHourToMinutes from "../utils/ConvertHoursToMinuts"
import Knex from 'knex'

interface Filters {
    week_day: number | string;
    subject: string;
    time: string
}

class ListLearningService {
    private transaction:Knex.Transaction

    constructor(transaction:Knex.Transaction) {
        this.transaction = transaction
    }

    public async execute({ week_day, subject, time }: Filters) {
        if (!week_day || !subject || !time) {
            throw new Error('Missing filters to search classe')
        }

        const timeInMinutes = convertHourToMinutes(time)
        
        const classeRepository = new ClasseRepository(this.transaction)

        const classes = await classeRepository.findClass({
            subject,
            week_day,
            time
        })

        return classes || null
    }
}

export default ListLearningService
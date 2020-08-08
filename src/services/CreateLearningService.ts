import db from '../database/connection'

import UserRepository from '../repositorys/UserRepository'
import ClasseRepository from '../repositorys/ClasseRepository'
import ClassScheduleRepository from '../repositorys/ClassScheduleRepository'
import Knex from 'knex'

interface Request {
    name: string,
    avatar: string,
    whatssap: string,
    subject: string,
    cost: number,
    bio: string,
    schedule: Array<Schedule>
}

interface Schedule {
    week_day: number;
    from: string;
    to: string;
}

class CreateLearningService {
    private userRepository: UserRepository
    private classRepository: ClasseRepository
    private classScheduleRepository: ClassScheduleRepository

    private transaction: Knex.Transaction

    constructor(transaction: Knex.Transaction) {
        this.transaction = transaction
        this.userRepository = new UserRepository(this.transaction)
        this.classRepository = new ClasseRepository(this.transaction)
        this.classScheduleRepository = new ClassScheduleRepository(this.transaction)
    }

    public async execute(props: Request) {
        try {
            const { bio, name, whatssap, avatar, cost, subject, schedule } = props


            const user_id = await this.userRepository.insert({
                avatar,
                bio,
                name,
                whatssap
            })

            if (!user_id) {
                throw new Error('Error to insertd User')
            }

            const class_id = await this.classRepository.inserteClasse({
                cost,
                subject,
                user_id
            })

            if (!class_id) {
                throw new Error('Error to insertd class')
            }

            const scheduleFormated = this.classScheduleRepository.formatedSchedule(class_id,schedule)

            const insertClassSchedule = await this.classScheduleRepository.insertClassSchedule(scheduleFormated)

            if (!insertClassSchedule) {
                throw new Error('Erro to insert to class schedule')
            }

        } catch (e) {
            throw new Error('Erro to insert')
        }
    }
}

export default CreateLearningService
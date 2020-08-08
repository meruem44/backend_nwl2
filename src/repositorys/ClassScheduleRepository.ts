import convertHourToMinute from '../utils/ConvertHoursToMinuts'
import db from '../database/connection'
import Knex from 'knex'

interface Schedule {
    week_day: number;
    from: string | number;
    to: number | string;
}

interface ScheduleInsert extends Schedule {
    class_id: number
}

class ClassScheduleRepository {

    private transaction: Knex.Transaction

    constructor(transaction: Knex.Transaction){
        this.transaction = transaction
    }

    public async insertClassSchedule(classSchedule: Array<ScheduleInsert>): Promise<boolean> {
        try {
            const insertdClassSchedule = await this.transaction('class_schedule').insert(classSchedule)
    
            return insertdClassSchedule.length > 0
        } catch(e) {
            throw new Error('Erro to insert to class_schedule')
        }
    }

    public formatedSchedule(class_id: number,data: Array<Schedule>){
        
        const classSchedule = data.map(item => ({
            class_id,
            week_day: item.week_day,
            from: convertHourToMinute(item.from as string),
            to: convertHourToMinute(item.to as string)
        }))

        return classSchedule 
    }

}

export default ClassScheduleRepository
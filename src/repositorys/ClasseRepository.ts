import db from '../database/connection'
import Knex from 'knex'
import convertHoursToMinuts from '../utils/ConvertHoursToMinuts'

interface CreateClasseDTO {
    subject: string;
    cost: number;
    user_id: number;
}

interface FilterClass {
    subject: string,
    week_day: number | string,
    time: string
}

class ClassesRepository {
    private transaction: Knex.Transaction

    constructor(transaction: Knex.Transaction){
        this.transaction = transaction
    }

    public async findClass({ subject, week_day, time }: FilterClass): Promise<Array<any>> {

        const timeFormated = convertHoursToMinuts(time)
        
        const classes = await this.transaction('classes')
        .whereExists(function() {
            this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = classes.id')
            .whereRaw('`class_schedule`.`week_day` =??',[Number(week_day)] )
            .whereRaw('`class_schedule`.`from` <= ??', [timeFormated])
            .whereRaw('`class_schedule`.`to` > ??', [timeFormated])


        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=','users.id')
        .select(['classes.*','users.*'])

        return classes
    }

    public async inserteClasse({ cost, subject, user_id }:CreateClasseDTO): Promise<number | null>{
       try {
        const idInsertedClasse = await this.transaction('classes').insert({
            subject,
            cost,
            user_id
        })

        return idInsertedClasse[0] || null
       } catch (e) {
        throw new Error('Error to insert classes')
       }
    }
}

export default ClassesRepository
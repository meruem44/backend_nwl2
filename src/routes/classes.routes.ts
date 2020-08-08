import * as Yup from 'yup'
import { Router } from 'express'

const classesRoutes = Router()

import CreateLearningService from '../services/CreateLearningService'
import ListLearningService from '../services/ListLearningService'
import db from '../database/connection'

// Corpo (Request Body): Dados para criação ou atualização
// Route Params: Identificar qual recurso quero atualizar ou deletar
// Query Params: Paginação, filtro, ordenação

classesRoutes.get('/', async (request, response) => {

    const schema = Yup.object().shape({
        subject: Yup.string().required(),
        time: Yup.string().required(),
        week_day: Yup.number().required(),

    })

    if (!await(schema.isValid(request.query))) {
        return response.json({ error: 'Filters missing' })
    }

    const trx = await db.transaction()

    try {

        const listLearningService = new ListLearningService(trx)

        const { week_day, subject, time } = request.query

        const learnings = await listLearningService.execute({
            subject: subject as string,
            time: time as string,
            week_day: week_day as string
        })

        trx.commit()

        return response.json(learnings)

    } catch(e) {
        trx.rollback()
        return response.status(400).json({
            error: e.message
        })
    }
})

classesRoutes.post('/', async (request, response) => {
    
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        avatar: Yup.string().required(),
        whatssap: Yup.string().required(),
        bio: Yup.string().required(),
        subject: Yup.string().required(),
        cost: Yup.number().required(),
        schedule: Yup.array().required()

    })

    if (!await(schema.isValid(request.query))) {
        return response.json({ error: 'Body missing' })
    }

    const trx = await db.transaction()
    
    try {

    const createLearningService = new CreateLearningService(trx)

    await createLearningService.execute(request.body)

    await trx.commit()

    return response.json({
        ok: true
    })
   }catch(e) {
    await trx.rollback()
    
    return response.status(400).json({
        error: e.message || 'Error internal'
    })
   }

})

export default classesRoutes
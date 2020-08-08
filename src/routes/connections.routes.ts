import * as Yup from 'yup'

import { Router } from 'express'

import FindTotalConnectionService from '../services/FindTotalConnectionService'
import CreateConnectionService from '../services/CreateConnectionService'

const connectionsRoutes = Router()

connectionsRoutes.get('/', async (request, response) => {

   try {
    const findTotalConnectionService = new FindTotalConnectionService() 

    const total = await findTotalConnectionService.execute()

    response.json({ total })
   } catch(e) {
       response.status(400).json({
           error: e.message || 'Error internal'
       })
   }
})

connectionsRoutes.post('/', async (request, response) => {

    const { user_id } = request.body

    if (!user_id) {
        response.status(400).json({
            error: 'user_id missing'
        })
    }

   try {
    const createConnectionService = new CreateConnectionService() 

    await createConnectionService.execute(user_id)

    response.json({ ok: true })
   } catch(e) {
       response.status(400).json({
           error: e.message || 'Error internal'
       })
   }
})

export default connectionsRoutes
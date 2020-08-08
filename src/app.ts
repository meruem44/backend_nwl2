import express, { json } from 'express'
import cors from 'cors'

import routes from './routes'

class App {
    public server: express.Application

    constructor() {
        this.server = express()

        this.middlewares()
        this.routes()
    }

    public middlewares():void {
        this.server.use(json())
        this.server.use(cors())
    }

    public routes():void {
        this.server.use(routes)
    }
}

export default new App().server
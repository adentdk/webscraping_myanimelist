import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { rootRoutes } from './http/rootRoutes'
import { logger } from './utils/logger'
import errorController from './http/errorController'

export function start(env) {
  logger.debug(`App running as ${env}`)
  const app = express()

  app.use(cors())

  // morgan logger request response
  app.use(morgan('combined', { stream: logger.morgan }))

  // Public File
  app.use("/public", express.static("public"));

  // BODY PARSER MIDDLEWARE
  app.use(json())
  app.use(urlencoded({ extended: true }))

  // API DOCS ROUTE
  app.use(
    "/api-docs/v1",
    swaggerUi.serve,
    swaggerUi.setup(require("./../docs/v1.json"))
  )

  // API BEGIN
  app.use('/', rootRoutes())

  app.use(errorController.notFound)

  return app
}

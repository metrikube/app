import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    cors: true
  })

  const globalPrefix = 'api/v1'
  app.setGlobalPrefix(globalPrefix)

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { version } = require('../../../package.json')

  const options = new DocumentBuilder().setTitle('Metrikube API').setDescription('API').setVersion(version).build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)

  const port = process.env.PORT || 3000
  await app.listen(port, '0.0.0.0')

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()

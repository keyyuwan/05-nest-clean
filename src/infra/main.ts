import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { Env } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // true -> diz ao Nest que a validação das envs foi feita e não podem ser undefined
  const configService: ConfigService<Env, true> = app.get(ConfigService)
  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}

bootstrap()

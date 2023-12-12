import { EnvService } from '@/infra/env/env.service'
import { OnModuleDestroy } from '@nestjs/common'
import { Redis } from 'ioredis'

export class RedisService extends Redis implements OnModuleDestroy {
  constructor(envService: EnvService) {
    super({
      host: envService.get('REDIS_HOST'),
      port: envService.get('REDIS_PORT'),
      db: envService.get('REDIS_DB'), // "nome" do banco se dá por números no Redis
    })
  }

  // onModuleInit - this.connect(): This method will be invoked automatically when creating a new Redis instance

  onModuleDestroy() {
    return this.disconnect()
  }
}

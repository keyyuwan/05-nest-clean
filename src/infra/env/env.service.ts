import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'

@Injectable()
export class EnvService {
  // true -> diz ao Nest que a validação das envs foi feita e não podem ser undefined
  constructor(private configService: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T) {
    return this.configService.get(key, { infer: true })
  }
}

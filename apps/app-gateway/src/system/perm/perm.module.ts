import { Global, Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { PermService } from './perm.service'
import { PermController } from './perm.controller'
import { RedisService } from '../../common/libs/redis/redis.service'

@Module({
  imports: [HttpModule],
  providers: [PermService,RedisService],
  controllers: [PermController],
  exports: [PermService]
})
export class PermModule {}

import { Module } from '@nestjs/common';
import { ConcurrentmodifGateway } from './concurrentmodif.gateway';

@Module({
  providers: [ConcurrentmodifGateway]
})
export class ConcurrentmodifModule {}

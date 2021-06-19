import { Module } from '@nestjs/common';
import { RestController } from './RestController';

@Module({
  controllers: [RestController],
  providers: [],
})
export class RestModule {}

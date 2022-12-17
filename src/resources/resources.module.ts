import { Module, Logger } from '@nestjs/common';
import { ResourcesController } from './resources.controller';

@Module({
  controllers: [ResourcesController],
  providers: [Logger],
})
export class ResourcesModule {}

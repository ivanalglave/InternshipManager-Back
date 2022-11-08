import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongodb } from './config';

@Module({
  imports: [MongooseModule.forRoot(mongodb.uri)],
  controllers: [],
  providers: [],
})
export class AppModule {}

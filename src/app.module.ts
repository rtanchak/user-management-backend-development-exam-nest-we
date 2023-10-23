import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';

@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb://localhost/nestjs-mongo')],
  controllers: [],
  providers: [],
})
export class AppModule {}

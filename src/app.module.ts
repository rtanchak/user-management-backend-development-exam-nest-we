import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [UserModule, GroupsModule, MongooseModule.forRoot('mongodb://localhost/nestjs-mongo')],
  controllers: [],
  providers: [],
})
export class AppModule {}

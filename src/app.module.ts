import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    UserModule,
    GroupsModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

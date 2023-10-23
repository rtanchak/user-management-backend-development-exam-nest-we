
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './group.model';
import { GroupsController } from './groups.controller';
import { GroupService } from './groups.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }])],
  controllers: [GroupsController],
  providers: [GroupService],
})
export class GroupsModule {}
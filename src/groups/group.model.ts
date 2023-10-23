import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema} from 'mongoose';
import { User } from 'src/users/users.model';

@Schema()
export class Group extends Document {
  @Prop()
  name: string;

  // Default status is 'notEmpty'
  @Prop({ default: 'notEmpty' })
  status: 'empty' | 'notEmpty';

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  users: User[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
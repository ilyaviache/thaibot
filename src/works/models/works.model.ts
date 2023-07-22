import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Works extends BaseModel {
  @Field(() => String, { nullable: false })
  chatId: string;

  @Field(() => Int, { nullable: true })
  selectedChatsId: number | null;

  @Field(() => [String], { nullable: true })
  listenChannelUsernames: string[];

  @Field(() => [String], { nullable: true })
  listenWords: string[];

  @Field(() => [String], { nullable: true })
  muteWords: string[];

  @Field(() => [String], { nullable: true })
  muteChannelUsernames: string[];

  @Field(() => [String], { nullable: true })
  muteUsernames: string[];

  @Field(() => User, { nullable: false })
  user: User;
}

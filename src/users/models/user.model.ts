import 'reflect-metadata';
import { ObjectType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Post } from 'src/posts/models/post.model';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class User extends BaseModel {
  @Field(() => String, { nullable: false })
  chatId: string;

  @Field(() => String, { nullable: true })
  firstname?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => [Post], { nullable: true })
  works?: [Post] | null;
}

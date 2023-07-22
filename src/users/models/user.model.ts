import 'reflect-metadata';
import { ObjectType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Works } from 'src/works/models/works.model';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class User extends BaseModel {
  @Field(() => String, { nullable: false })
  chatId: string;

  @Field(() => String, { nullable: true })
  firstname?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => [Works], { nullable: true })
  works?: [Works] | null;
}

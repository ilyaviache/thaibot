import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class InitUserInput {
  @Field()
  chatId: string;
  @Field({ nullable: true })
  firstname?: string;
  @Field({ nullable: true })
  username?: string;

  constructor(data: Partial<InitUserInput>) {
    Object.assign(this, data);
  }
}

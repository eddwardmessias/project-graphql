import { Field, InputType } from "type-graphql";

@InputType()
export class createUserInput {
  @Field(() => String)
  name!: string;
  @Field(() => String)
  email!: string
}

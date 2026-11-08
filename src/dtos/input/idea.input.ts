import { Field, InputType } from "type-graphql";

@InputType()
export class createIdeaInput {
  @Field(() => String)
  title!: string;
  @Field(() => String, { nullable: true })
  description?: string;
}

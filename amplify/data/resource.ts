import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { generateImage } from "../functions/generateImage/resource";
import { generateGameListing } from "../functions/generateGameListing/resource";

const schema = a.schema({
  Game: a
    .model({
      name: a.string().required(),
      description: a.string().required(),
      rating: a.float().required(),
      price: a.float().required(),
      image: a.string().required(),
    })
    .authorization((allow) => [allow.owner()]),
  generateGameListing: a
    .query()
    .arguments({
      description: a.string().required(),
    })
    .returns(
      a.customType({
        name: a.string().required()
      })
    )
    .handler(a.handler.function(generateGameListing))
    .authorization((allow) => [allow.authenticated()]),

  generateImage: a
    .query()
    .arguments({
      prompt: a.string(),
    })
    .returns(a.string().array())
    .handler(a.handler.function(generateImage))
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});

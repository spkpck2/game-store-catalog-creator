import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import type { Schema } from "../../data/resource";

import { env } from "$amplify/env/generateGameListing";

export const handler: Schema["generateGameListing"]["functionHandler"] = async (
  event
) => {
  const client = new BedrockRuntimeClient({ region: "us-west-2" });
  const args = JSON.stringify(event.arguments);
  const results = await client.send(
    new InvokeModelCommand({
      modelId: env.MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        system:
          "You are a helpful assistant that generates video game listings information based on a description. Please fill out the information as best as you can. Using the description provided create a catchy name, create a fun description between 10 to 15 words, and create a random rating between 1 to 5. Also create a price between $10.00 and $100.00 dollars. Make up information if none is provided. Return in JSON",
        max_tokens: 1000,
        tools: [
          {
            name: "responseType",
            description: "Generate a response type for the given field",
            input_schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "name of video game UTF-8 string with quotes",
                },
                description: {
                  type: "string",
                  description: "description of video game UTF-8",
                },
                rating: {
                  type: "number",
                  description: "rating of video game from 1 to 5 UTF-8",
                },
                price: {
                  type: "number",
                  description: "price of a game",
                },
              },
              required: ["name", "description", "rating", "price"],
            },
          },
        ],
        tool_choice: { type: "tool", name: "responseType" },
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: args,
              },
            ],
          },
        ],
      }),
    })
  );

  const jsonString = new TextDecoder().decode(results.body);
  const res = JSON.parse(jsonString);

  return {
    name: res.content[0].input.name,
    description: res.content[0].input.description,
    rating: res.content[0].input.rating,
    price: res.content[0].input.price,
  };
};

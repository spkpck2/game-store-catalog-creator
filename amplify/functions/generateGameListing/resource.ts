import { defineFunction } from "@aws-amplify/backend";

export const MODEL_ID = "anthropic.claude-3-sonnet-20240229-v1:0";

export const generateGameListing = defineFunction({
  name: "generateGameListing",
  environment: {
    MODEL_ID,
  },
  entry: "./handler.ts",
  timeoutSeconds: 500,
});

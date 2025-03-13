import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import {
 BedrockAgentRuntimeClient,
 InvokeAgentCommand 
} from "@aws-sdk/client-bedrock-agent-runtime";
import type { Schema } from "../../data/resource";

import { env } from "$amplify/env/generateGameListing";

export const handler: Schema["generateGameListing"]["functionHandler"] = async (
  event
) => {
  const client = new BedrockAgentRuntimeClient({ region: "us-west-2" }); 
	const command = new InvokeAgentCommand({
	agentId: "ILVUMV8CBH",
	agentAliasId: "UOATZ4IVSA",
	sessionId: "12311231",
	enableTrace: false,
	inputText: event.arguments.description,
  });
		const response = await client.send(command);
		let responseText = "";
		if(response.completion) {
			for await (const event of response.completion) {
				if (event.chunk) {
					 responseText =  new TextDecoder('utf-8').decode(event.chunk.bytes);
					 console.log(responseText);
				}
			}
		}

return {
 response:responseText,
};
};

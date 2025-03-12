import {
  BedrockRuntimeClient,
  InvokeAgentCommand,
} from "@aws-sdk/client-bedrock-runtime";
import type { Schema } from "../../data/resource";

import { env } from "$amplify/env/generateGameListing";

export const handler: Schema["generateGameListing"]["functionHandler"] = async (
  event
) => {
  const client = new BedrockRuntimeClient({ region: "us-west-2" });
  const invokeAgent = async(agentId: string, agentAliasId: string, sessionId: string, inputText: string) => {
	const command = new InvokeAgentCommand({
	agentId: agentId,
	agentAliasId: agentAliasId,
	sessionId: sessionId,
	enableTrace: false,
	inputText: inputText,
	});

	try {
		const response = await client.send(command);
		if(response.completion) {
			for await (const event of response.completion) {
				if (event.chunk) {
					const responseText = new TextDecoder('utf-8').decode(event.chunk.bytes);
					console.log(responseText);
				}
			}
		} else {
			throw new Error("Completion is undefined");
		}
	} catch(error) {
		console.error("Error invoking agent:", error);
		}
};

const agentId = "ILVUMV8CBH";
const agentAliasId = "UOATZ4IVSA";
const sessionId = "12311231";
const inputText = "Generate a message to advertise a promotion";

invokeAgent(agentId, agentAliasId, sessionId, inputText);
};

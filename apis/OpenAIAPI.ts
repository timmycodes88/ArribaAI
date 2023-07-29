import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";

interface OpenAIAPI {
    generate: (messages: ChatCompletionRequestMessage[]) => Promise<ChatCompletionRequestMessage>;
    generateCode: (messages: ChatCompletionRequestMessage[]) => Promise<ChatCompletionRequestMessage>;
    generateImages: (values: {prompt: string, amount: string, resolution: string}) => Promise<any>;
}

const OpenAIAPI: OpenAIAPI = {
    generate: async (messages) => {
       const res = await axios.post("/api/chat", { messages });
        return res.data;
    },
    generateCode: async (messages) => {
        const res = await axios.post("/api/code", { messages });
         return res.data;
     },
     generateImages: async (values) => {
        const res = await axios.post("/api/imagine", values);
        return res.data;
     }
}

export default OpenAIAPI;

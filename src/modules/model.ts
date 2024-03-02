import { TaskType } from "@google/generative-ai";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { GOOGLE_GEMINI_KEY } from "../config/config";

export const GModel = new ChatGoogleGenerativeAI({
    apiKey: GOOGLE_GEMINI_KEY,
    modelName: 'gemini-pro',
    maxOutputTokens: 2048,
    temperature: 0.9
});

export const GEmbbeding = new GoogleGenerativeAIEmbeddings( {
    apiKey: GOOGLE_GEMINI_KEY,
    modelName: 'embedding-001',
    taskType: TaskType.RETRIEVAL_DOCUMENT,
    title: "VisaMexicoCanada Document",
})
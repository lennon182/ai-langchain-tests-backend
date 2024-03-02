
import { configDotenv } from 'dotenv';
configDotenv();

export const GOOGLE_GEMINI_KEY = process.env.GG_API_KEY;
export const URI_SCRAP = process.env.URI_SCRAP || '';



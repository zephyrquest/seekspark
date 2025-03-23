import {Chatbot} from "./chatbot";
import {GoogleGenerativeAI} from "@google/generative-ai";
import {UserConfig} from "../../../assets/user.config";

export class Gemini extends Chatbot {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    super("Gemini");
    this.genAI = new GoogleGenerativeAI(UserConfig.API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating text with Gemini:', error);
      throw error;
    }
  }
}

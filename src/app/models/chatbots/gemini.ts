import {Chatbot} from "./chatbot";
import {GoogleGenerativeAI} from "@google/generative-ai";

export class Gemini implements Chatbot {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI('');
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

import {Injectable} from "@angular/core";
import {Chatbot} from "../models/chatbots/chatbot";
import {Gemini} from "../models/chatbots/gemini";

@Injectable({providedIn: 'root'})
export class ChatbotService {
  private chatbot: Chatbot = new Gemini();

  async generateText(prompt: string): Promise<string> {
    return await this.chatbot.generateText(prompt);
  }
}

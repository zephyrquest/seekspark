import {Injectable} from "@angular/core";
import {Chatbot} from "../models/chatbots/chatbot";
import {Gemini} from "../models/chatbots/gemini";
import {BehaviorSubject} from "rxjs";
import {Message} from "../models/message";

@Injectable({providedIn: 'root'})
export class MessageService {
  private chatbot: Chatbot = new Gemini();

  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  public async handleChatbotResponseGeneration(userPrompt: string): Promise<void> {
    this.addNewUserMessage(userPrompt);
    const text = await this.chatbot.generateText(userPrompt);
    this.addNewChatbotMessage(text);
  }

  private addNewUserMessage(text: string): void {
    const message = new Message(text, 'user');

    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next([...currentMessages, message]);
  }

  private addNewChatbotMessage(text: string): void {
    const message = new Message(text, 'chatbot');

    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next([...currentMessages, message]);
  }
}

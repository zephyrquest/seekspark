import {Injectable} from "@angular/core";
import {Chatbot} from "../models/chatbots/chatbot";
import {Gemini} from "../models/chatbots/gemini";
import {BehaviorSubject} from "rxjs";
import {Message} from "../models/message";

@Injectable({providedIn: 'root'})
export class ConversationService {
  private chatbotSubject = new BehaviorSubject<Chatbot>(new Gemini());
  chatbot$ = this.chatbotSubject.asObservable();

  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  public setChatbot(chatbot: Chatbot): void {
    this.chatbotSubject.next(chatbot);
  }

  public async handleChatbotResponseGeneration(userPrompt: string): Promise<void> {
    const currentChatbot = this.chatbotSubject.getValue();

    this.addNewUserMessage(userPrompt);
    const text = await currentChatbot.generateText(userPrompt);
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

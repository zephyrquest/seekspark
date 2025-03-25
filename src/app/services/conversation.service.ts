import {Injectable} from "@angular/core";
import {Chatbot} from "../models/chatbots/chatbot";
import {Gemini} from "../models/chatbots/gemini";
import {BehaviorSubject} from "rxjs";
import {Message} from "../models/message";
import {ChatSession} from "../models/chatsession";

@Injectable({providedIn: 'root'})
export class ConversationService {
  // current chatbot
  private chatbotSubject = new BehaviorSubject<Chatbot>(new Gemini());
  chatbot$ = this.chatbotSubject.asObservable();

  // list of messages in current chat session
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  // list of available chat sessions
  private chatSessionsSubject = new BehaviorSubject<ChatSession[]>([]);
  chatSessions$ = this.chatSessionsSubject.asObservable();

  // current chat session
  private chatSessionSubject = new BehaviorSubject<ChatSession | null>(null);
  chatSession$ = this.chatSessionSubject.asObservable();


  public setCurrentChatbot(chatbot: Chatbot): void {
    this.chatbotSubject.next(chatbot);
  }

  public loadChatSessions(): void {
    this.chatSessionsSubject.next([
      new ChatSession(1, "Chat 1"),
      new ChatSession(2, "Chat 2"),
      new ChatSession(3, "Chat 3"),
    ])
  }

  public setCurrentChatSession(chatSession: ChatSession): void {
    this.chatSessionSubject.next(chatSession);
  }

  public loadMessagesFromCurrentChatSession(): void {
    const chatSession = this.chatSessionSubject.getValue();

    if(chatSession) {
      this.messagesSubject.next(chatSession.messages);
    }
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

    const chatSession = this.chatSessionSubject.getValue();
    if(chatSession) {
      chatSession.messages = [...currentMessages, message];
    }
  }

  private addNewChatbotMessage(text: string): void {
    const message = new Message(text, 'chatbot');
    const currentMessages = this.messagesSubject.getValue();

    this.messagesSubject.next([...currentMessages, message]);

    const chatSession = this.chatSessionSubject.getValue();
    if(chatSession) {
      chatSession.messages = [...currentMessages, message];
    }
  }
}

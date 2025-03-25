import {Component, OnInit} from '@angular/core';
import { ChatSession } from "../../models/chatsession"
import {NgForOf, NgIf} from "@angular/common";
import {ConversationService} from "../../services/conversation.service";

@Component({
  selector: 'app-chat-session-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './chat-session-list.component.html',
  styleUrl: './chat-session-list.component.css'
})
export class ChatSessionListComponent implements OnInit {
  chatSessions: ChatSession[] = [];
  chatSessionSelected: ChatSession | null = null;

  constructor(private conversationService: ConversationService) {}

  ngOnInit(): void {
    this.conversationService.chatSessions$.subscribe((chatSessions) => {
      this.chatSessions = chatSessions;
    })

    this.conversationService.chatSession$.subscribe((chatSession) => {
      this.chatSessionSelected = chatSession;
    })

    this.conversationService.loadChatSessions();

    if(this.chatSessions.length > 0) {
      this.conversationService.setCurrentChatSession(this.chatSessions[0]);
    }
  }

  handleChatSessionClick(id: number): void {
    const chatSession = this.chatSessions.find(cs => cs.id === id);

    if(chatSession) {
      this.conversationService.setCurrentChatSession(chatSession);
      this.conversationService.loadMessagesFromCurrentChatSession();
    }
  }
}

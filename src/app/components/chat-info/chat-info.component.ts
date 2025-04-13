import {Component, OnInit} from '@angular/core';
import {ConversationService} from "../../services/conversation.service";
import {ChatSession} from "../../models/chatsession";

@Component({
  selector: 'app-chat-info',
  standalone: true,
  imports: [],
  templateUrl: './chat-info.component.html',
  styleUrl: './chat-info.component.css'
})
export class ChatInfoComponent implements OnInit {
  chatSession: ChatSession | null = null;

  constructor(private conversationService: ConversationService) {}

  ngOnInit(): void {
    this.conversationService.chatSession$.subscribe((chatSession) => {
      this.chatSession = chatSession;
    })
  }
}

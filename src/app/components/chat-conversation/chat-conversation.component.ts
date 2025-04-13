import {Component, OnInit} from '@angular/core';
import {Message} from "../../models/message";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ConversationService} from "../../services/conversation.service";

@Component({
  selector: 'app-chat-conversation',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './chat-conversation.component.html',
  styleUrl: './chat-conversation.component.css'
})
export class ChatConversationComponent implements OnInit {
   messages: Message[] = [];

   constructor(private conversationService: ConversationService) {}

  ngOnInit(): void {
    this.conversationService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }
}

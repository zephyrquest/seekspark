import {Component, OnInit} from '@angular/core';
import {Message} from "../../models/message";
import {NgClass, NgForOf} from "@angular/common";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-chat-conversation',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './chat-conversation.component.html',
  styleUrl: './chat-conversation.component.css'
})
export class ChatConversationComponent implements OnInit {
   messages: Message[] = [];

   constructor(private chatbotService: MessageService) {}

  ngOnInit(): void {
    this.chatbotService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }
}

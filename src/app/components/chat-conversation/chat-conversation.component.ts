import { Component } from '@angular/core';
import {Message} from "../../models/message";
import {NgClass, NgForOf} from "@angular/common";

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
export class ChatConversationComponent {
   messages: Message[] = [
     new Message('Ask me anything!', 'chatbot'),
     new Message('Who are you?', 'user'),
     new Message('I\'m a chatbot.', 'chatbot'),
     new Message('What is the capital of Switzerland?', 'user'),
     new Message('The capital of Switzerland is Bern.', 'chatbot'),
     new Message('And of Italy?', 'user'),
     new Message('The capital of Italy is Rome.', 'chatbot')
  ];
}

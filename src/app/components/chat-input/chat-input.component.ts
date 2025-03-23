import {Component, OnInit} from '@angular/core';
import { FormsModule } from "@angular/forms";
import {ConversationService} from "../../services/conversation.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css'
})
export class ChatInputComponent implements OnInit {
  text: string = '';
  chatbotName: string = '';

  constructor(private conversationService: ConversationService) {}

  ngOnInit() {
    this.conversationService.chatbot$.subscribe((chatbot) => {
      this.chatbotName = chatbot.name;
    })
  }

  async handleSendButtonClick(): Promise<void> {
    if(!this.text.trim()) {
      return;
    }

    await this.conversationService.handleChatbotResponseGeneration(this.text);
    this.text = '';
  }
}

import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {MessageService} from "../../services/message.service";
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
export class ChatInputComponent {
  text: string = '';

  constructor(private chatbotService: MessageService) {}

  async handleSendButtonClick(): Promise<void> {
    if(!this.text.trim()) {
      return;
    }

    await this.chatbotService.handleChatbotResponseGeneration(this.text);
    this.text = '';
  }
}

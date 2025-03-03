import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {ChatbotService} from "../../services/chatbot.service";
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
  output: string = '';

  constructor(private chatbotService: ChatbotService) {}

  async handleSendMessage(): Promise<void> {
    if(!this.text.trim()) {
      return;
    }

    console.log('Message sent:', this.text);

    this.output = 'Generating response...';
    this.output = await this.chatbotService.generateText(this.text);

    this.text = '';
  }
}

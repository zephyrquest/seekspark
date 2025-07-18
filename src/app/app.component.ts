import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatSessionListComponent } from './components/chat-session-list/chat-session-list.component';
import { ChatConversationComponent } from './components/chat-conversation/chat-conversation.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import {ChatInfoComponent} from "./components/chat-info/chat-info.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatSessionListComponent, ChatConversationComponent, ChatInputComponent, ChatInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SeekSpark';
}

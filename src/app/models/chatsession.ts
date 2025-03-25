import {Message} from "./message";

export class ChatSession {
  constructor(
    public id: number,
    public name: string,
    public messages: Message[] = []
  ) {}
}

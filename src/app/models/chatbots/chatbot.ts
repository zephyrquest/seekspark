export abstract class Chatbot {
  protected constructor(public _name: string) {}

  get name(): string {
    return this._name;
  }

  abstract generateText(prompt: string): Promise<string>;
}

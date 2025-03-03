export interface Chatbot {
    generateText(prompt: string): Promise<string>;
}

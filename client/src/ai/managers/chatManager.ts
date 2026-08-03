import { AIMessage } from '../types/ai';

export class ChatManager {
  messages: AIMessage[] = [];

  addMessage(role: AIMessage['role'], content: string) {
    const message: AIMessage = { id: crypto.randomUUID(), role, content, timestamp: Date.now() };
    this.messages.push(message);
    return message;
  }

  getHistory() {
    return this.messages;
  }
  
  clearHistory() {
    this.messages = [];
  }
}

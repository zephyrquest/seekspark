import {Injectable} from "@angular/core";
import {Chatbot} from "../models/chatbots/chatbot";
import {Gemini} from "../models/chatbots/gemini";
import {BehaviorSubject} from "rxjs";
import {Message} from "../models/message";
import {ChatSession} from "../models/chatsession";

@Injectable({providedIn: 'root'})
export class ConversationService {
  // current chatbot
  private chatbotSubject = new BehaviorSubject<Chatbot>(new Gemini());
  chatbot$ = this.chatbotSubject.asObservable();

  // list of messages in current chat session
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  // list of available chat sessions
  private chatSessionsSubject = new BehaviorSubject<ChatSession[]>([]);
  chatSessions$ = this.chatSessionsSubject.asObservable();

  // current chat session
  private chatSessionSubject = new BehaviorSubject<ChatSession | null>(null);
  chatSession$ = this.chatSessionSubject.asObservable();


  public setCurrentChatbot(chatbot: Chatbot): void {
    this.chatbotSubject.next(chatbot);
  }

  public loadChatSessions(): void {
    const c1 = new ChatSession(1, "Chat 1");
    c1.messages = [
      new Message("Hi", "user"),
      new Message("Hi there, how can I help you?", "chatbot"),
      new Message("Tell me a random story", "user"),
      new Message("Barnaby Buttonsby, a badger with an unusually discerning palate, had just discovered the secret. He’d spent weeks, months even, tracking the faintest whiff of truffle – a scent so intoxicating, so utterly *Barnaby*, that it drove him to the deepest, darkest corners of the Whispering Woods. He finally found it: not one, but a cluster of magnificent black truffles, nestled beneath the gnarled roots of an ancient oak. But guarding them wasn't a pig, as Barnaby expected, but a tiny, iridescent hummingbird named Zephyr. Zephyr, surprisingly, wasn't aggressive. He simply zipped back and forth, chirping a frantic melody. \"Buzz off, badger!\" he'd squeak, followed by a blur of wings and another chirp, \"These truffles belong to Penelope!\" Penelope, Barnaby learned, was a grumpy, arthritic snail who was convinced the truffles held the secret to reversing time. She couldn't possibly *eat* them, but she believed their aroma, inhaled just so, would make her young again. Barnaby, a creature of logic despite his truffle obsession, tried to reason. \"Penelope, my dear, even if this were true, wouldn't time reversal be a disastrous paradox? Think of the butterflies!\" Penelope, who was halfway up the oak root, paused, her eyestalks swiveling. \"Butterflies are just flashy caterpillars,\" she grumbled. \"I want my garden back! And my teeth!\" (Snails don't have teeth, but Penelope was prone to hyperbole). Zephyr buzzed excitedly. \"See? She needs them!\" Barnaby, faced with a grumpy snail who dreamed of dentures and a hummingbird with an overdeveloped sense of loyalty, did the only logical thing: he offered to make a deal. \"Penelope,\" he said, \"I will harvest half the truffles, leaving the other half for you. But in return, I insist on making you the most exquisite truffle-infused snail butter the Whispering Woods has ever seen. It will ease your arthritis, I promise.\" Penelope considered. Snail butter sounded... surprisingly appealing. And Barnaby Buttonsby, despite his badger-ness, was known for his culinary prowess. \"Fine,\" she conceded, a sliver of slime leaving a glittering trail. \"But I get to taste it first.\" And so, Barnaby Buttonsby, the discerning badger, spent the next day churning snail butter, flavored with truffle so pungent it made Zephyr sneeze. Penelope, thoroughly mollified, declared it \"divine\" and even managed to climb a few extra inches up the oak. Barnaby, content with his half of the truffle treasure, decided that sometimes, the greatest delicacies are not those devoured, but those that bring a little bit of unexpected peace (and delicious snail butter) to the Whispering Woods. And he learned, perhaps, that even the most obsessed badger can learn a thing or two from a grumpy snail and a ridiculously loyal hummingbird. He just hoped Penelope wouldn't try to reverse time and ruin his perfect recipe.\n", "chatbot")
    ];

    this.chatSessionsSubject.next([
      c1,
      new ChatSession(2, "Chat 2"),
      new ChatSession(3, "Chat 3"),
    ])
  }

  public setCurrentChatSession(chatSession: ChatSession): void {
    this.chatSessionSubject.next(chatSession);
    this.messagesSubject.next(chatSession.messages);
  }

  public loadMessagesFromCurrentChatSession(): void {
    const chatSession = this.chatSessionSubject.getValue();

    if(chatSession) {
      this.messagesSubject.next(chatSession.messages);
    }
  }

  public async handleChatbotResponseGeneration(userPrompt: string): Promise<void> {
    const currentChatbot = this.chatbotSubject.getValue();

    this.addNewUserMessage(userPrompt);
    const text = await currentChatbot.generateText(userPrompt);
    this.addNewChatbotMessage(text);
  }

  private addNewUserMessage(text: string): void {
    const message = new Message(text, 'user');
    const currentMessages = this.messagesSubject.getValue();

    this.messagesSubject.next([...currentMessages, message]);

    const chatSession = this.chatSessionSubject.getValue();
    if(chatSession) {
      chatSession.messages = [...currentMessages, message];
    }
  }

  private addNewChatbotMessage(text: string): void {
    const message = new Message(text, 'chatbot');
    const currentMessages = this.messagesSubject.getValue();

    this.messagesSubject.next([...currentMessages, message]);

    const chatSession = this.chatSessionSubject.getValue();
    if(chatSession) {
      chatSession.messages = [...currentMessages, message];
    }
  }
}

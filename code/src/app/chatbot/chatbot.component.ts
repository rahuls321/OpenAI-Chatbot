import { Component, OnInit } from '@angular/core';

import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  constructor(private chatBotService: ChatbotService){}

  chatbotMessages: any[] = [];
  botInput: string = 'Human: Hello, who are you? \nAI: I am doing great. How can I help you today?\n';
  humanInput: string = '';
  chatLog: string[] = [];

  ngOnInit() {
    this.chatLog.push(this.botInput);
  }

  getResponse(prompt: string): void{
    prompt = prompt.trim();
    if(prompt.length>0){
      // const getPrompt = this.chatLog.slice(-2).toString() + "Human: " + prompt + "\n";
      this.chatbotMessages.push({'human':prompt})
      this.chatBotService.getChatbotResponse(prompt).subscribe(
        resp => {
          const respMessage = JSON.parse(JSON.stringify(resp));
          // this.chatbotMessages['bot'].push(respMessage.response);
          // this.chatbotMessages['human'].push(prompt);
          // this.chatbotMessages.push({'bot': respMessage.response, 'human': prompt});
          this.chatbotMessages.at(-1)['bot'] = respMessage.response;
          this.chatLog.push("Human: " + prompt + "\n AI: " + respMessage.response + "\n");
        }
      )
      this.humanInput='';
    }
  }
}
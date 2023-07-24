import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { delay,  tap } from "rxjs/operators";
 

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private chatbotUrl = 'http://localhost:5000/chatbot';  // URL to web api

  /** GET messages from the chatbot */
  getChatbotMessage(): Observable<string> {
    return this.http.get<string>(this.chatbotUrl);
  }

  getChatbotResponse(prompt: string): Observable<string>{
    const url = `${this.chatbotUrl}/botMessage?prompt=${prompt}`
    // return this.http.get<string>(url)
    return this.http.get<string>(url);
  }
}

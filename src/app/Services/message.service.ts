import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    return this.http.post(config.backendUrl + '/message', { prompt: message });
  }
}

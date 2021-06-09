import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Message} from '../_models/message';
import {ReadBy} from '../_models/read_by';
import {MessageSent} from '../_models/message_sent';
import {BASE_URL} from './base';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http:HttpClient,
  ) { }
  /**
   * Sends a get request to URL to get the messages
   * 
   * @param id Represents the course id for which the messages are to be obtained
   * 
   * @return Array Object of Messages
   */
  GET_MESSAGES(id:number):Observable<Message>{
    const URL=BASE_URL+'/api/messages/'+id.toString()+'/';
    return this.http.get<Message>(URL,httpOptions);
  }
  /**
   * Send Message service makes a post request to URL passing a message object and also whom to send
   * @param id Course Id
   * @param message Message to be sent
   * @param to Which stores whom to send(Either only to TA or both)
   * @return Post Request 
   */
  SEND_MESSAGE(id:number,message:MessageSent,to:string): Observable<Message>{
    const URL=BASE_URL+'/api/messages/'+id.toString()+'/';
    var data={};
    data['to']=to;
    data['message']=message['message_text'];
    window.alert('message sent : '+message['message_text']);
    data['prior']=message['message_priority'];

    
    
    return this.http.post<Message>(URL,data,httpOptions);
  }
  /**
   * This service sends a GET request to URL to get the list of users who read a particular message
   * @param id Message Id
   * @return Array of User Objects who read the message
   */
  READ_MESSAGE(id:number)
  {
    const URL=BASE_URL+'/api'+'/readby/'+id.toString()+'/';
    return this.http.get<ReadBy>(URL,httpOptions);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  res: any;

  username: any;
  chatRoomName: any

  chatName = new Subject()

  constructor(private _http: HttpClient) { }

  createRoom(data: any): Observable<any> {
    return this._http.post(environment.baseUrl + '/chat', data)
  }
  getAllChatRoom() {
    return this._http.get(environment.baseUrl + '/chat')
  }

  allowNewUser(data: any): Observable<any> {
    return this._http.post(environment.baseUrl + '/chat/auth', data)
  }

  getUserChatRoom(id: any) {
    return this._http.get(environment.baseUrl + '/chat/' + id)
  }
  getOneChatRoom(id: any) {
    return this._http.get(environment.baseUrl + '/chat/room/' + id)
  }
  getGroupMessages(id: any) {
    return this._http.get(environment.baseUrl + '/chat/message/' + id)
  }

  leaveTeam(data: any) {
    return this._http.post(environment.baseUrl + '/chat/leave', data)
  }

  sendNewMessage(data: any) {
    return this._http.post(environment.baseUrl + '/chat/message', data)
  }
  deleteChatRoom(id: any) {
    return this._http.delete(environment.baseUrl + '/chat/' + id)
  }

  private socket = io('https://nest-chat-backend.herokuapp.com', { transports: ['websocket'] });



  joinRoom(data: any) {
    this.socket.emit('join', data);
  }



  public sendMessage(room: string, message: string, user: any) {

    console.log(user);


    this.socket.emit('new-message', { room: room, message: message, user: user });
    console.log("message sent", message);




  }



  public getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('new-message', (data: any) => {
        console.log(data);

        observer.next(data);
      });

    });

    console.log(observable);


    return observable;
  }

  joinPublicGroup(data: any): Observable<any> {
    return this._http.post(environment.baseUrl + '/chat/public', data)
  }


  newUserJoined() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  leaveRoom(data: any) {
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('left room', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }



}

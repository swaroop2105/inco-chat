import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  isPrivate = false;

  chatRoomName: FormControl = new FormControl('', [Validators.required])
  chatpassword: FormControl = new FormControl('', [Validators.required])
  chatRoom: FormGroup = new FormGroup({
    chatRoomName: this.chatRoomName,
    chatpassword: this.chatpassword
  })

  constructor(private chatService: ChatService, private toasterService: ToastrService) { }

  ngOnInit(): void {
  }

  isPrivateRoom() {
    this.isPrivate = true;
  }
  isPublicRoom() {
    this.isPrivate = false;
  }

  createRoom() {

    const obj = {
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName'),
      chatName: this.chatRoomName.value,
      isPrivate: this.isPrivate,
      chatPassword: this.chatpassword.value
    }

    this.chatService.createRoom(obj).
      subscribe(
        (res) => {
          console.log(res);
          this.toasterService.success('', 'ChatRoom created successfully')

        }, err => {
          console.log(err);

          this.toasterService.error('', err.error.message)
        }
      )
    console.log(obj);

  }

}

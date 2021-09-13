import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-password',
  templateUrl: './chat-password.component.html',
  styleUrls: ['./chat-password.component.scss']
})
export class ChatPasswordComponent implements OnInit {


  chatpassword: FormControl = new FormControl('', [Validators.required])
  chatRoom: FormGroup = new FormGroup({

    chatpassword: this.chatpassword
  })

  constructor(@Inject(MAT_DIALOG_DATA) public chat: any, private chatService: ChatService, private toasterService: ToastrService, private router: Router) { }

  ngOnInit(): void {

  }



  loginToChatRoom() {
    const obj = {
      roomId: this.chat.chatId,
      chatPassword: this.chatpassword.value,
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName')
    }

    this.chatService.allowNewUser(obj).
      subscribe(
        (res) => {
          console.log(res);
          if (res.auth) {
            this.toasterService.success('', 'Login Success');
            const obj = {
              room: this.chat.room,
              user: localStorage.getItem('userName')
            }
            this.chatService.joinRoom(obj)
            this.router.navigate(['/chat/' + this.chat.room + '/' + this.chat.chatId])
          } else {
            this.toasterService.error('', 'Invalid credintials')
          }

        }, err => {
          console.log(err);

        }
      )


  }


}

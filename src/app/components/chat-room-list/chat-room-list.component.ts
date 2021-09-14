import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ChatService } from 'src/app/services/chat.service';
import * as introJs from 'intro.js'
import { MatDialog } from '@angular/material/dialog';
import { ChatRoomComponent } from 'src/app/dilogModels/chat-room/chat-room.component';
import { ChatPasswordComponent } from 'src/app/dilogModels/chat-password/chat-password.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'src/app/dilogModels/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.scss']
})
export class ChatRoomListComponent implements OnInit {
  chatname: any;
  myChat = true;
  joined = false;
  checker: any;
  chatRoomNames: any = []
  userRooms: any;
  allRooms: any;
  currentUserId: any;
  value: any



  chatRoomName: FormControl = new FormControl('')

  chatRoom: FormGroup = new FormGroup({
    chatRoomName: this.chatRoomName
  })

  constructor(private router: Router, private chatService: ChatService, private apiService: ApiService, private dialog: MatDialog, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId')
    this.getUserChatRooms();
    this.getAllChatRooms();
    this.checker = localStorage.getItem("new")
    if (this.checker == 'yes') {
      setTimeout(() => {
        this.intro()
      }, 600);
    }
  }

  myChats() {
    this.myChat = true;
  }
  chatRooms() {
    this.myChat = false;
  }
  joinRoom() {
    this.joined = true;
  }

  chat(room: any) {
    console.log("clicked");

    this.chatService.chatRoomName = room;
    const obj = {
      room: room,
      user: localStorage.getItem('userName')
    }
    this.chatService.joinRoom(obj)
    this.router.navigate(['/chat/' + room])
  }

  submit() {



    this.chatname = this.chatRoomName.value
    this.chatRoomNames.push(this.chatname)
    console.log(this.chatRoom.value);

  }

  intro() {
    introJs().setOptions({
      showProgress: true,
      exitOnOverlayClick: true,
      showStepNumbers: true,
      position: 'bottom',
      showBullets: false
    }).start()
  }

  createChatRoom() {
    let dialogRef = this.dialog.open(ChatRoomComponent, {
      width: '600px'
    })

    dialogRef.afterClosed().
      subscribe(
        (res) => {
          this.getUserChatRooms();
        }
      )
  }

  getUserChatRooms() {
    this.chatService.getUserChatRoom(localStorage.getItem('userId')).
      subscribe(
        (res) => {
          console.log(res);
          this.userRooms = res;

        }, err => {
          console.log(err);

        }
      )
  }

  getAllChatRooms() {
    this.chatService.getAllChatRoom().
      subscribe(
        (res) => {
          console.log(res);
          this.allRooms = res;

        }, err => {
          console.log(err);

        }
      )
  }

  joinPublicRoom(id: any, isLocked, chatRoom) {
    console.log("called");

    if (!isLocked) {
      this.chatService.chatRoomName = chatRoom;

      const data = {
        roomId: id,
        userId: localStorage.getItem('userId'),
        userName: localStorage.getItem('userName')
      }

      this.chatService.joinPublicGroup(data).
        subscribe(
          (res) => {
            console.log(res);
            const obj = {
              room: chatRoom,
              user: localStorage.getItem('userName')
            }
            this.chatService.joinRoom(obj)
            this.router.navigate(['/chat/' + chatRoom + '/' + id])

          }, err => {
            console.log(err);

          }
        )


    } else {
      this.dialog.open(ChatPasswordComponent, {
        width: '400px',
        data: { chatId: id, room: chatRoom }

      })
    }
  }

  logout() {


    let dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { name: localStorage.getItem('userName'), text: 'do you really want to logout', logout: true } })

    dialogRef.afterClosed().
      subscribe(
        (res) => {
          if (res == 'yes') {
            localStorage.clear();
            this.router.navigate(['/landing']);
            this.toastService.info('', 'logged you out')
          } else {

          }
        }, err => {
          console.log(err);

        }
      )











  }
  deleteChatRoom(id: any) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { name: localStorage.getItem('userName'), text: 'Are you sure, you want to delete the chatRoom', delete: true } })

    dialogRef.afterClosed().
      subscribe(
        (res) => {
          if (res == 'yes') {
            this.chatService.deleteChatRoom(id).
              subscribe(
                (res) => {
                  this.getUserChatRooms()
                }, err => {
                  this.toastService.error(err.error.message)
                }
              )
          } else {

          }
        }, err => {
          console.log(err);

        }
      )
  }


}

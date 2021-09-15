import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/dilogModels/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {










  avathars = [
    'https://images.freeimages.com/images/premium/previews/2136/21368666-cartoon-moon.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0k7GBGrZlaMZ2g_e_K7D9FCIp4pgmWYjyK-wXyIoh3pF9L9cP9j-TgDQbeM_Vo3uWLNk&usqp=CAU',
    'https://media.istockphoto.com/vectors/cute-cartoon-earth-vector-id1050787688?k=6&m=1050787688&s=170667a&w=0&h=2uyF90kH9zViHss-1j08QbIz6TK-atQ5jW3LohpgfVY=',
    'https://i.pinimg.com/originals/ce/ea/d5/ceead543c65e28bc5c915429b5c0570e.jpg'
  ]


  toggled: boolean = false;



  isToxic = false;
  newMessage: any = [];
  messageList: any = [];
  time = new Date();
  userName: any;
  chatRoom: any;
  selectedFile: any;
  url: any;
  chatCounter = 0;
  id: any;
  messages: any;
  admin: any;
  isEmoji = false;
  newUser: any;
  noti = true;



  userList: any = []
  groupMembers: any = []
  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.getChatRoomDetails()
    this.getGrpMessages();
    localStorage.setItem("isNotification", "yes");

    this.userName = localStorage.getItem('userName');
    this.chatService
      .getMessages()
      .subscribe((message: any) => {
        console.log(message, "line 66");

        const obj = {
          user: message.user,
          message: message.message,
          time: new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })
        }
        this.messages.push(obj)
        this.chatCounter += 1;

        if (localStorage.getItem('isNotification') == 'yes') {
          if (message.user != this.userName) {
            let audio = new Audio();
            audio.src = '../../../assets/message.wav'
            audio.load()
            audio.play()
          } else {

            let audio = new Audio();
            audio.src = '../../../assets/send.mp3'
            audio.load()
            audio.play()

          }
        }

      });

    this.chatService.newUserJoined().
      subscribe(
        (res) => {

          if (res.user != this.userName) {
            this.newUser = res.user + ' ' + res.message;

            if (localStorage.getItem('isNotification') == 'yes') {
              let audio = new Audio();
              audio.src = '../../../assets/newUser.mp3'
              audio.load()
              audio.play()
            }



            this.snackBar.open(this.newUser, 'dismiss', { duration: 2000 })


          }


          this.getChatRoomDetails();
        }
      )


    this.chatService.userLeftRoom().
      subscribe(
        (res) => {
          this.getChatRoomDetails();
          if (res.user != this.userName) {
            if (localStorage.getItem('isNotification') == 'yes') {
              let audio = new Audio();
              audio.src = '../../../assets/leave.mp3'
              audio.load()
              audio.play()
            }


            this.newUser = res.user + ' ' + res.message;
            this.snackBar.open(this.newUser, 'dismiss', { duration: 2000 })
          }
        }
      )


  }

  getGrpMessages() {
    this.chatService.getGroupMessages(this.id).
      subscribe(
        (res) => {
          console.log(res);
          this.messages = res

        }, err => {
          console.log(err);

        }
      )
  }
  sendMessage() {

    this.closeEmoji()
    this.chatService.sendMessage(this.chatRoom.chatName, this.newMessage, this.userName);
    const obj = {
      roomId: this.id,
      user: this.userName,
      message: this.newMessage,
      time: new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })
    }
    this.chatService.sendNewMessage(obj).
      subscribe(
        (res) => {
          console.log(res);


        }, err => {
          console.log(err);


        }
      )

    console.log(this.chatRoom.chatName);

    this.newMessage = '';

  }

  onSelectFile(event: any) { // called each time file input changes
    this.selectedFile = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }




  }

  showEmoji() {
    this.isEmoji = true;
  }
  closeEmoji() {
    this.isEmoji = false;
  }
  notify() {
    this.noti = true;
    localStorage.setItem("isNotification", "yes");

  }
  stopNotify() {

    this.noti = false;
    localStorage.setItem("isNotification", "no");

  }

  getChatRoomDetails() {
    console.log(this.id);

    this.chatService.getOneChatRoom(this.id).
      subscribe(
        (res) => {
          console.log(res);
          this.chatRoom = res;
          this.groupMembers = this.chatRoom.groupMembers
          for (let i = 0; i < this.groupMembers.length; i++) {
            if (this.groupMembers[i].memberId == this.chatRoom.creator) {
              console.log(this.groupMembers[i]);
              this.admin = this.groupMembers[i];
              this.groupMembers.splice(i, 1)
            }
          }

        }, err => {
          console.log(err);

        }
      )
  }

  leaveRoom() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { name: this.userName, text: 'do you really want to quit the chatRoom?' } })

    dialogRef.afterClosed().subscribe
      (
        (res) => {
          console.log(res);

          if (res == 'yes') {

            const cred = {
              roomId: this.id,
              userId: localStorage.getItem('userId')
            }

            this.chatService.leaveTeam(cred).
              subscribe(
                (res) => {
                  console.log(res);
                  this.getChatRoomDetails();

                }, err => {
                  console.log(err);

                }
              )

            const obj = {
              room: this.chatRoom.chatName,
              user: this.userName
            }
            this.chatService.leaveRoom(obj);
            this.router.navigate(['/chatRoom'])
          }
          else {

          }
        }
      )



  }








  addEmoji(e) {
    this.newMessage += e.emoji.native;
  }




}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatRoomListComponent } from './components/chat-room-list/chat-room-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TFJSModule } from 'ngx-tfjs';
import { EmojifyModule } from 'angular-emojify';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './auth/signup/login/login.component';
import { SignupComponent } from './auth/signup/singup/signup.component';
import { ToastrModule } from 'ngx-toastr';
import { ChatRoomComponent } from './dilogModels/chat-room/chat-room.component';
import { ConfirmDialogComponent } from './dilogModels/confirm-dialog/confirm-dialog.component';
import { ChatPasswordComponent } from './dilogModels/chat-password/chat-password.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';



const config: SocketIoConfig = { url: 'http://localhost:5000', options: { transports: ['websocket'] } };

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatRoomListComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    ChatRoomComponent,
    ConfirmDialogComponent,
    ChatPasswordComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    TFJSModule,
    EmojifyModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    PickerModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

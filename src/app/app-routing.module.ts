import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/signup/login/login.component';
import { SignupComponent } from './auth/signup/singup/signup.component';
import { ChatRoomListComponent } from './components/chat-room-list/chat-room-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { LandingComponent } from './components/landing/landing.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'chatRoom',
    component: ChatRoomListComponent
  },
  {
    path: 'chat/:name/:id',
    component: ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

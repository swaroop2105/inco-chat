import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ChatService } from 'src/app/services/chat.service';
import * as introJs from 'intro.js'
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  uname: any;
  checker: any;


  userName: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]);

  loginForm: FormGroup = new FormGroup({
    userName: this.userName,
    password: this.password,
  })

  constructor(private router: Router, private authService: AuthService, private toasterService: ToastrService) { }



  ngOnInit(): void {

  }

  root() {
    this.router.navigate(['/landing'])
  }

  signUp() {
    this.router.navigate(['/signup'])
  }



  login() {
    const obj = {
      displayName: this.userName.value,
      password: this.password.value
    }

    this.authService.login(obj).
      subscribe(
        (res) => {
          console.log(res);

          localStorage.setItem('userName', res.displayName);
          localStorage.setItem('userId', res._id);
          this.toasterService.success('', 'Login success');
          this.router.navigate(['/chatRoom'])
        }, err => {
          console.log(err);
          this.toasterService.error('', err.error.message);

        }
      )

  }







}

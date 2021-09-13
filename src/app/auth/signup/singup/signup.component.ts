import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import * as introJs from 'intro.js'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  uname: any;
  checker: any;

  userName: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]);
  cpassword: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]);

  signupForm: FormGroup = new FormGroup({
    userName: this.userName,
    password: this.password,
    cpassword: this.cpassword
  })

  constructor(private router: Router, private toastService: ToastrService, private authService: AuthService) { }



  ngOnInit(): void {
    this.checker = localStorage.getItem("new")
    if (this.checker == 'yes') {
      setTimeout(() => {
        this.intro()
      }, 600);
    }

  }

  intro() {
    introJs().setOptions({
      showProgress: true,
      exitOnOverlayClick: true,
      showStepNumbers: true,
      showBullets: false
    }).start()
  }


  signup() {
    if (this.password.value == this.cpassword.value) {
      introJs().exit()
      const obj = {
        displayName: this.userName.value,
        password: this.password.value
      }
      console.log(obj);

      this.authService.signup(obj).
        subscribe(
          (res) => {
            localStorage.setItem('userName', res.displayName)
            localStorage.setItem('userId', res._id)
            this.toastService.success('', 'Signup successful')
            this.router.navigate(['/chatRoom'])
          }, err => {
            console.log(err);
            this.toastService.error('', err.error.message)
          }
        )

    }
    else {
      this.toastService.error('', 'Confirm password miss match')
    }

  }


}

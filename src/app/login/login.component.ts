import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { Validators,AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
// import { setString } from "application-settings";
import * as appSettings from "tns-core-modules/application-settings";
import { alert } from './../widgets/dialog-util';
import { User } from './../models/user.model';
import { LoginService } from './../service/login.service';
import { ContactService } from './../service/contact.service';

@Component({
 selector: "Login",
 moduleId: module.id,
 templateUrl: "./login.component.html",
 styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public _user = <User>{};
  email: AbstractControl;
  password: AbstractControl;
  loginForm: FormGroup; 
  user: User;
  isLoggingIn = true;

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
  constructor(
      private formBuilder:FormBuilder,
      private router: Router,
      private routerExtensions: RouterExtensions,
      private page: Page,
      private userService: LoginService,
      private contactService:ContactService
    ) {
      this.user = new User();

      this.loginForm = this.formBuilder.group({
            email: [""],
            password:[""],
      });

  }
  ngOnInit() {
    this.page.actionBarHidden = true;
    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }
  submit() {
  //   if (!this.user.isValidEmail()) {
  //    alert("Enter a valid email address.");
  //    return;
  //   }
    
    let formvalues = this.loginForm.value;
        //console.log(formvalues);
       
    this._user.email = formvalues.email;
    this._user.password = formvalues.password;

    if (this.isLoggingIn) {
    this.login();
    } else {
    this.signUp();
    }
  }

  login() {
    // this.user.email = "test@gmail.com";
    // this.user.password = "test123";
    this.userService.login(this._user)
    .then(status => {
      appSettings.setString("user_id", this._user.email);
     // this.getContacts();
      this.routerExtensions.navigate(['contact/contact-list'], { clearHistory: true });
    }, err => {
      this.clearFields();
      alert("Unfortunately we could not find your account.");
    });
  }
  signUp() {
    //  this.user.email = "test@gmail.com";
    // this.user.password = "test123";
    this.userService.register(this._user)
    .then(status => {
      alert("Your account was successfully created.");
      this.toggleDisplay();
      this.clearFields();
    }, err => {
      this.clearFields();
      alert("Unfortunately we were unable to create your account.")
    });
  }
  clearFields() {
    this._user.email = '';
    this._user.password = '';
    let formvalues = this.loginForm.value;
    formvalues.email = '';
    formvalues.password = '';
  }

   getContacts() {
      this.contactService.getContacts();
    }
}




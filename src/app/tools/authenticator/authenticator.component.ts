import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { FirebaseTSAuth } from "firebasets/firebasetsAuth/firebaseTSAuth";

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent {
  state = AuthenticatorCompState.LOGIN;
  firebasetsAuth: FirebaseTSAuth;

  constructor() {
    this.firebasetsAuth = new FirebaseTSAuth();
  }
  
  onRegisterClick(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerConfirmPassword: HTMLInputElement){
      
      let email = registerEmail.value;
      let password = registerPassword.value;
      let confirmPassword = registerConfirmPassword.value;

      if(
        this.isNotEmpty(email) &&
        this.isNotEmpty(password)
      ){

        this.firebasetsAuth.createAccountWith(
          {
            email: "",
            password: "",
            onComplete: (uc) => {
              alert("Account Created");
            },
            onFail: (err) => {
              alert("Failed to create the account.");
            }
          }
          );
        }
  }

  isNotEmpty(text:string){
    return text != null && text.length > 0;
  }

  isMatch(text: string, comparedWith: string){
    return text == comparedWith;
  }

  onForgotPasswordClick(){
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;

  }

  onCreateAccountClick(){
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick(){
    this.state = AuthenticatorCompState.LOGIN;
  }

  isLoginState(){
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisterState(){
    return this.state == AuthenticatorCompState.REGISTER;
  }

  isForgotPasswordState(){
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }

  getStateText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:
        return "Login";
      case AuthenticatorCompState.REGISTER:
        return "Register";
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return "Forgot Password";
    }
  }
}

export enum AuthenticatorCompState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}

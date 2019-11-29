import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { User } from './user.model';
import { LoginUser } from './login-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  newUser: User = {
    name: '',
    email: '',
    password: ''
  }

  existedUser: LoginUser = {
    email: '',
    password: ''
  }

  signUp(newUser: User) {
    return this.http.post(environment.url + 'postSignUp', newUser)
  }

  login(existedUser: LoginUser) {
    return this.http.post(environment.url + 'userAuth', existedUser)
  }

  forgotPassword(value) {
    return this.http.post(environment.url + 'forgotPassword', value)
  }

  getSelectedUser(id: any) {
    return this.http.get(environment.url + 'selectedUser/' + id)
  }

  editUser(id: any, value) {
    return this.http.post(environment.url + 'post-editUser/' + id, value)
  }

  deleteUser(id: any) {
    return this.http.post(environment.url + 'deleteUser/' + id, id)
  }

  // facebook login -->
  loginFacebook() {
    return this.http.get(environment.url + 'login/facebook')
  }

  // twitter login -->
  loginTwitter() {
    return this.http.get(environment.url + 'login/twitter')
  }

  // google login -->
  loginGoogle() {
    return this.http.get(environment.url + 'auth/google')
  }

  // linkedin login -->
  loginLinkedin() {
    return this.http.get(environment.url + 'auth/linkedin')
  }


  // Authentications -->
  setToken(token: string) {
    localStorage.setItem('userToken', token)
  }

  getToken() {
    return localStorage.getItem('userToken')
  }

  getPayload() {
    var token = this.getToken()
    var userPayload = atob(token.split('.')[1])
    if(userPayload) {
      return JSON.parse(userPayload)
    }
    else {
      return null
    }
  }

  isLoggedIn() {
    var userpayload = this.getPayload()
    if(userpayload) {
      return userpayload.exp>Date.now()/1000
    }
    else {
      return null
    }
  }
}

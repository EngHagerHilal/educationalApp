import { User } from './../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData : User = {}
  constructor(private http: HttpClient) { }

  login(data: User){
    let param = {
      "email": data.email,
      "password": data.password
    }
    console.log('params:',param)
    return this.http.post(environment.APIURL + 'login', param)
  }
  changePassword(data: any){
    let param = {
      "api_token": this.userData.API_Token,
      "currentPass": data.currentPass,
      "newPass": data.newPass
    }
    console.log('params:',param)
    return this.http.post(environment.APIURL + 'profile/change-password', param)
  }
  getMyDataAsStudent(){
    let param = {
      "api_token": this.userData.API_Token
    }
    console.log('params:',param)
    return this.http.post(environment.APIURL + 'student/get-student-data', param)
  }
}

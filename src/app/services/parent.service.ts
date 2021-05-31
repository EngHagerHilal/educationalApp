import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Student } from './../interfaces/student';
import { Exam } from './../interfaces/exam';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  myChildrenCash : Student [] = []
  myProfileExamsCash : {exam?: Exam, student?: Student}[] = []
  constructor(private http: HttpClient, private auth: AuthService, private navCtr: NavController) { }
  getStudentData(studentID){
    let param = {
      "api_token": this.auth.userData.API_Token,
      "student_id": studentID
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'student/get-student-data', param)
  }
  latestExams(){
    let param = {
      "api_token": this.auth.userData.API_Token
    }
    console.log('params: ', param)
    return this.http.post(environment.APIURL + 'exams/all-new-exams-of-all-child', param)
  }
  addNewChild(childCode){
    let param = {
      "api_token": this.auth.userData.API_Token,
      "user_code": childCode
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'parent/add-child', param)
  }
  getMyChildrenList(){
    let param = {
      "api_token": this.auth.userData.API_Token
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'parent/child-list', param)
  }
  getExamsList(studentID){
    let param = {
      "api_token": this.auth.userData.API_Token,
      "student_id": studentID
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'exams/all-exams-of-child', param)
  }
  getPreviousExamsList(studentID){
    let param = {
      "api_token": this.auth.userData.API_Token,
      "student_id": studentID
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'exams/previous-exams', param)
  }
  logOut() {
    this.auth.userData = {}
    this.myChildrenCash = []
    this.myChildrenCash = []
    localStorage.removeItem('ZEDNY_USERDAtA')
    this.navCtr.navigateRoot('/user/login')
  }
}

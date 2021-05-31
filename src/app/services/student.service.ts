import { Student } from './../interfaces/student';
import { Homework } from './../interfaces/homework';
import { NavController } from '@ionic/angular';
import { Exam } from './../interfaces/exam';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  newFinalExamsCash: Exam [] = []
  previousFinalExamsCash: Exam [] = []
  newRunningExamsCash: Exam [] = []
  previousRunningExamsCash: Exam [] = []
  newHomeworksCash: Homework [] = []
  previousHomeworksCash: Homework [] = []
  studentDataCash: Student = {}
  constructor(private http: HttpClient, private auth: AuthService, private navCtr: NavController) { }
  // octa-221@gmail.com 12345678
  // ================================== final exams ========================================
  getNewFinalExams(){
    let param = {
      "api_token": this.auth.userData.API_Token
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'exams/new-exams', param)
  }
  getPreviousFinalExams(){
    let param = {
      "api_token": this.auth.userData.API_Token
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'exams/previous-exams', param)
  }
  getFinalExam(id: number){
    let param = {
      "api_token": this.auth.userData.API_Token,
      "exam_id": id
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'exams/preview-exam', param)
  }
  submitFinalExam(answersArray, examId){
    let param = {
      "api_token": this.auth.userData.API_Token,
      "exam_id": examId,
      "questions": answersArray
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'exams/get-exam-result', param)
  }
  // ================================== running exams ======================================
  getNewRunningExams(){
    let param = {
      "api_token": this.auth.userData.API_Token
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'running-exams/new-exams', param)
  }
  getPreviousRunningExams(){
    let param = {
      "api_token": this.auth.userData.API_Token
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'running-exams/previous-exams', param)
  }
  getRunningExam(id: number){
    let param = {
      "api_token": this.auth.userData.API_Token,
      "exam_id": id
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'running-exams/preview-exam', param)
  }
  submitRunningExam(answersArray, examId){
    let param = {
      "api_token": this.auth.userData.API_Token,
      "exam_id": examId,
      "questions": answersArray
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'running-exams/get-exam-result', param)
  }
  // ================================== homework ======================================
  getNewHomeworks(){
    let param = {
      "api_token": this.auth.userData.API_Token
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'homework/new-homework', param)
  }
  getPreviousHomeworks(){
    let param = {
      "api_token": this.auth.userData.API_Token
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'homework/previous-homework', param)
  }
  getHomework(id: number){
    let param = {
      "api_token": this.auth.userData.API_Token,
      "homework_id": id
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'homework/preview-homework', param)
  }
  submitHomework(answersArray, examId){
    let param = {
      "api_token": this.auth.userData.API_Token,
      "homework_id": examId,
      "questions": answersArray
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'homework/get-homework-result', param)
  }
  // ================================== simulate exam ======================================
  getSimulateExam(id, number){
    let param = {
      "api_token": this.auth.userData.API_Token,
      "questionsNum":number,
      "subject_id":id,
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'exams-simulations/student-simulation', param)
  }
  submitSimulateExam(answersArray){
    let param = {
      "api_token": this.auth.userData.API_Token,
      "questions": answersArray
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'exams-simulations/student-simulation-result', param)
  }
// ================================== Other ======================================
  uploadFile(filesArray, examId, resultId, type){
    let param = {
      "api_token": this.auth.userData.API_Token,
      "exam_id": examId,
      "exam_type": type,
      "exam_result_id": resultId,
      "filesUploaded": filesArray
   }
   console.log('params: ', param)
   return this.http.post(environment.APIURL + 'attachment/upload', param)
  }
  logOut(){
    this.auth.userData = {}
    this.studentDataCash = {}
    this.newFinalExamsCash = []
    this.previousFinalExamsCash = []
    this.newRunningExamsCash = []
    this.previousRunningExamsCash = []
    this.newHomeworksCash = []
    this.previousHomeworksCash = []
    localStorage.removeItem('ZEDNY_USERDAtA')
    this.navCtr.navigateRoot('/user/login')
  }
}

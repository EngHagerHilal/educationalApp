import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UiControllerFunService } from './../../../services/uiControllerFun.service';
import { Question } from './../../../interfaces/question';
import { StudentService } from './../../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from './../../../../environments/environment';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExamPage implements OnInit {
  myId = null
  type = null
  imgUrl : string
  examDuration : number
  questions : Question [] = []
  answers : any [] = []
  isLoading: boolean = false
  isTimeOut: boolean = false
  isSubmitting: boolean = false
  constructor(private activatedRoute: ActivatedRoute, private student: StudentService, private uiService: UiControllerFunService,
    private translate: TranslateService, private nav: NavController) { }

  ngOnInit() {
    this.isLoading = true
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.imgUrl = environment.IMGURL
    console.log('data sendned: ',{id: this.myId, type: this.type})
    if(this.type == 'final') this.getFinalExamDetails()
    else if (this.type == 'running') this.getRunningExamDetails()
  }

  getFinalExamDetails(){
    this.student.getFinalExam(this.myId).subscribe( (response: any) => {
      console.log('Final details response: ', response);
      if(response.status && response.exam.questions.length > 0){
        // response.exam.examDuration
        this.examDuration = response.exam.examDuration;
        this.questions = response.exam.questions;
        let timer =
        setInterval( () => {
          if (this.examDuration > 0){
            this.examDuration = this.examDuration - 0.0166666666666667;
          }else{
            this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.please_wait'))
            clearInterval(timer);
            this.isTimeOut = true;
            this.submit();
          }
        }, 1000);
      }
      this.isLoading = false;
    })
  }
  getRunningExamDetails(){
    this.student.getRunningExam(this.myId).subscribe( (response: any)=>{
      console.log('Running details response: ', response)
      if(response.status && response.exam?.questions.length > 0){
        this.examDuration = response.exam.examDuration
        this.questions = response.exam.questions
        let timer =
        setInterval( ()=>{
          if(this.examDuration > 0){
            this.examDuration = this.examDuration - 0.0166666666666667
          }else{
            this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.please_wait'))
            clearInterval(timer);
            this.isTimeOut = true
            this.submit()
          }
        },1000)
      }
      this.isLoading = false
    })
  }
  setAnswer(questionIndex, id, answer, type, answer2?){
    let answerObject: any = {}
    if(type == 'multiple_choice'){
      if (this.answers[questionIndex]){   // answers list is defined
        let subAnswers: any[] = this.answers[questionIndex]?.answer?.filter( function searchexist(element) {
          return element === answer
        })
        console.log('subAnswers: ', subAnswers)
        console.log('answers: ', this.answers)
        if(subAnswers.length > 0){   // remove choise from question answers list
          this.answers[questionIndex]?.answer.splice(this.answers[questionIndex]?.answer.indexOf(subAnswers[0]), 1)
          console.log('answer exist before, so removed', this.answers)
        }else {   // add new choise to question answers list
          this.answers[questionIndex]?.answer.push(answer)
          console.log('new answer pushed in arr')
          console.log('answers: ', this.answers)
        }
      }else {   // this is first question and answers list undefined yet
        answerObject = {
          "id": id,
          "answer": [answer],
          "type": type
        }
        this.answers[questionIndex] = answerObject
        console.log('question answer: ', this.answers)
      }
    }else if(type == 'correct'){
      answerObject = {
        "id": id,
        "wrong_word": answer,
        "correct_answer": answer2,
        "type": type
     }
     console.log('answerObject correct: ', answerObject)
     this.answers[questionIndex] = answerObject
     console.log('question answer: ', this.answers)
    }else if(type == 'complete_with_options'){
      let elemnet: any = {
        "point": answer,
        "answer": answer2
      }
      if(this.answers[questionIndex]){   // index of answers list is defined
        let subAnswers: any[] = this.answers[questionIndex]?.answer?.filter( function searchexist(element) {
          return element.answer == answer2
        })
        console.log('subAnswers: ', subAnswers)
        console.log('answers: ', this.answers)
        if(subAnswers.length > 0){   // replace the exist answer with new point id
          this.answers[questionIndex].answer[this.answers[questionIndex]?.answer.indexOf(subAnswers[0])] = elemnet
          console.log('answer exist before, so removed', this.answers)
        }else {   // add new answer with new point id to answers list
          this.answers[questionIndex]?.answer.push(elemnet)
          console.log('new answer pushed in arr')
          console.log('answers: ', this.answers)
        }
      }else { // index of answers list is undefined yet
        let elemnet: any = {
          "point": answer,
          "answer": answer2
        }
        answerObject = { "id": id, "answer": [elemnet], "type": type }
        this.answers[questionIndex] = answerObject
      }
      console.log()
    }else if(type == 'steps'){
      console.log('==============================================')
      console.log('step id: ', answer2)
      console.log('answer: ', answer)
      let elemnet: any = {
        "answer": answer,
        "step_id": answer2
      }
      if(this.answers[questionIndex]){   // index of answers list is defined
        let subAnswers: any[] = this.answers[questionIndex]?.answer?.filter( function searchexist(element) {
          return element.step_id == answer2
        })
        console.log('subAnswers: ', subAnswers)
        console.log('answers: ', this.answers)
        if(subAnswers.length > 0){   // replace the exist answer with new point id
          this.answers[questionIndex].answer[this.answers[questionIndex]?.answer.indexOf(subAnswers[0])] = elemnet
          console.log('answer exist before, so replace', this.answers)
        }else {   // add new answer with new point id to answers list
          this.answers[questionIndex]?.answer.push(elemnet)
          console.log('new answer pushed in arr')
          console.log('answers: ', this.answers)
        }
      }else { // index of answers list is undefined yet
        let elemnet: any = {
          "answer": answer,
          "step_id": answer2
        }
        answerObject = { "id": id, "answer": [elemnet], "type": type }
        this.answers[questionIndex] = answerObject
        console.log('answers: ', this.answers)
      }
    }else if(type == 'picture'){
      console.log('==============================================')
      console.log('marker_id: ', answer2)
      console.log('answer: ', answer)
      let elemnet: any = {
        "answer": answer,
        "marker_id": answer2
      }
      if(this.answers[questionIndex]){   // index of answers list is defined
        let subAnswers: any[] = this.answers[questionIndex]?.answer?.filter( function searchexist(element) {
          return element.marker_id == answer2
        })
        console.log('subAnswers: ', subAnswers)
        console.log('answers: ', this.answers)
        if(subAnswers.length > 0){   // replace the exist answer with new point id
          this.answers[questionIndex].answer[this.answers[questionIndex]?.answer.indexOf(subAnswers[0])] = elemnet
          console.log('answer exist before, so replace', this.answers)
        }else {   // add new answer with new point id to answers list
          this.answers[questionIndex]?.answer.push(elemnet)
          console.log('new answer pushed in arr')
          console.log('answers: ', this.answers)
        }
      }else { // index of answers list is undefined yet
        const elemnet: any = {
          "answer": answer,
          "marker_id": answer2
        }
        answerObject = { "id": id, "answer": [elemnet], "type": type }
        this.answers[questionIndex] = answerObject
        console.log('answers: ', this.answers)
      }
    }else {
      answerObject = {
        "id": id,
        "answer": answer,
        "type": type
      }
      this.answers[questionIndex] = answerObject
      console.log('question answer: ', this.answers)
    }
  }
  submit(){
    console.log('answers: ', this.answers)
    const clearAnswers : any[] = this.answers.filter( function clear(element) {
      return element.id
    })
    console.log('clearAnswers: ', clearAnswers)
    if(this.type === 'final') this.submitFinalExam(clearAnswers)
    else if (this.type === 'running') { this.submitRunningExam(clearAnswers) }
  }
  submitFinalExam(answers){
    this.isSubmitting = true
    console.log('time: ',this.examDuration)
    this.student.submitFinalExam(answers, this.myId).subscribe( (response: any)=> {
      console.log('submitFinal response: ', response)
      if(response.status){
        if(this.isTimeOut){
          this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.timeOut_exam'))
        }else {
          this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.submite_exam'))
        }
        this.nav.navigateRoot('child/myProfile')
      }else {
        this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.server_problem'))
        this.isSubmitting = false
      }
    })
  }
  submitRunningExam(answers){
    this.isSubmitting = true
    console.log('time: ',this.examDuration)
    this.student.submitRunningExam(answers, this.myId).subscribe( (response: any)=> {
      console.log('submitRunning response: ', response)
      if(response.status && response.result){
        if(this.isTimeOut){
          this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.timeOut_exam'))
        }else {
          this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.submite_exam'))
        }
        this.nav.navigateRoot('child/myProfile')
      }else {
        this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.server_problem'))
        this.isSubmitting = false
      }
    })
  }
}

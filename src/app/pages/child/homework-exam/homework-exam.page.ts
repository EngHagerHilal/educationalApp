import { Component, OnInit } from '@angular/core';
import { Question } from './../../../interfaces/question';
import { Subject } from './../../../interfaces/subject';
import { ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { StudentService } from './../../../services/student.service';
import { UiControllerFunService } from './../../../services/uiControllerFun.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-homework-exam',
  templateUrl: './homework-exam.page.html',
  styleUrls: ['./homework-exam.page.scss'],
})
export class HomeworkExamPage implements OnInit {
  subjects: Subject[] = []
  questions : Question [] = []
  answers : any [] = []
  isSubmitting: boolean = false
  imgUrl : string
  myId = null
  isLoading : boolean = false
  constructor(private activatedRoute: ActivatedRoute, private student: StudentService, private uiService: UiControllerFunService
    , private alertController: AlertController, private translate: TranslateService, private nav: NavController) { }

  ngOnInit() {
    this.isLoading = true
    this.imgUrl = environment.IMGURL
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('myId sendned: ', this.myId)
    this.student.getHomework(this.myId).subscribe( (response: any) => {
      console.log('homework details response: ', response);
      if(response.status && response.exam.questions.length > 0){
        this.questions = response.exam.questions;
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
        let elemnet: any = {
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
    this.student.submitHomework(clearAnswers, this.myId).subscribe( (response:any)=>{
      console.log('submitHomework response: ', response)
      if(response.status && response.result){
        this.presentAlertResult(response.result.studentResult, response.result.finalResult)
      }else {
        this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.server_problem'))
      }
    })
  }
  async presentAlertResult(studentResult, finalResult) {
    let results = {
      student : studentResult,
      final : finalResult
    }
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: this.translate.instant('SIMULATEPAGE.result_alert_header'),
      message: this.translate.instant('SIMULATEPAGE.result_alert_message', results),
      buttons: [
        {
          text: this.translate.instant('SIMULATEPAGE.num_alert_close'),
          role: 'cancel',
          cssClass: 'alert_Ok_button',
          handler: (blah) => {
            this.nav.navigateRoot('child/newHomework')
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }
}

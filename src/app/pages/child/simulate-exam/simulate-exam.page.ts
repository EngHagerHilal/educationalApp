import { UiControllerFunService } from './../../../services/uiControllerFun.service';
import { environment } from './../../../../environments/environment';
import { Question } from './../../../interfaces/question';
import { Subject } from './../../../interfaces/subject';
import { AuthService } from './../../../services/auth.service';
import { StudentService } from './../../../services/student.service';
import { AlertController, MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-simulate-exam',
  templateUrl: './simulate-exam.page.html',
  styleUrls: ['./simulate-exam.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SimulateExamPage implements OnInit {
  subjects: Subject[] = []
  questions : Question [] = []
  answers : any [] = []
  isSubmitting: boolean = false
  imgUrl : string
  constructor(private alertController: AlertController, private translate: TranslateService, private student: StudentService,
    private auth: AuthService, private uiService: UiControllerFunService, private menu: MenuController) { }
  async ngOnInit() {
    this.imgUrl = environment.IMGURL
    if(this.student.studentDataCash?.subjects) {
      this.subjects = this.student.studentDataCash.subjects;
      this.showRadio()
    }else {
      await this.uiService.presentLoading(this.translate.instant('TOASTMESSAGES.please_wait'))
      this.auth.getMyDataAsStudent().subscribe( (response: any)=> {
        console.log('my data: ', response)
        if(response.status && response.studentData){
          this.subjects = response.studentData.subjects
          this.student.studentDataCash = response.studentData
          this.showRadio()
        }
        this.uiService.dissmisloading()
      }, (err)=> {
        this.uiService.dissmisloading()
      })
    }
    console.log('subjects: ', this.student.studentDataCash)
  }
  showRadio(){
    let radio_options = [];
    for(let i=0;i<this.subjects.length;++i){
       radio_options.push({
        name: this.subjects[i].id,
        type: 'radio',
        label : this.subjects[i].title,
        value : this.subjects[i].id,
        checked : i === 0
      });
    }
    this.presentAlertRadio(radio_options)
  }
  async presentAlertRadio(optionsArray) {
    const alert = await this.alertController.create({
      //cssClass: 'alert',
      header: this.translate.instant('SIMULATEPAGE.radio_alert_header'),
      message: this.translate.instant('SIMULATEPAGE.radio_alert_massege'),
      inputs: optionsArray,
      buttons: [
        {
          text: this.translate.instant('SIMULATEPAGE.radio_alert_next'),
          cssClass: 'alert_Ok_button',
          handler: (data:string) => {
            console.log('Confirm ok with id: ', data);
            this.presentAlertNumber(data)
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlertNumber(subjectId){
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: this.translate.instant('SIMULATEPAGE.num_alert_header'),
      message: this.translate.instant('SIMULATEPAGE.num_alert_massege'),
      inputs: [
        {
          name: 'questionNum',
          type: 'number',
          placeholder: this.translate.instant('SIMULATEPAGE.num_alert_placeholder'),
        }
      ],
      buttons: [
        {
          text: this.translate.instant('SIMULATEPAGE.num_alert_back'),
          role: 'cancel',
          cssClass: 'alert_cancel_button',
          handler: () => {
            console.log('Confirm Cancel');
            this.showRadio()
          }
        }, {
          text: this.translate.instant('SIMULATEPAGE.num_alert_simulate'),
          cssClass: 'alert_Ok_button',
          handler: (data) => {
            console.log('Confirm Ok', {subject_id: subjectId, number: data.questionNum});
            if(data.questionNum != '' && data.questionNum > 0) this.simulateExam(subjectId, data.questionNum)
            else {
              this.uiService.presentToast(this.translate.instant('SIMULATEPAGE.num_alert_validation'))
              this.presentAlertNumber(subjectId)
            }
          }
        }
      ]
    });

    await alert.present();
  }
  async simulateExam(subjectId, questionNum){
    await this.uiService.presentLoading(this.translate.instant('TOASTMESSAGES.please_wait'))
    this.student.getSimulateExam(subjectId, questionNum).subscribe( (response: any)=>{
      console.log('simulateExam response: ', response)
      if(response.status && response.exam.questions){
        this.questions = response.exam.questions
        if(this.questions.length == 0) {
          this.showRadio()
          this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.simulate_noQuestions'))
        }
      }
      this.uiService.dissmisloading()
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
    this.isSubmitting = true
    let clearAnswers : any[] = this.answers.filter( function clear(element) {
      return element.id
    })
    console.log('clearAnswers: ', clearAnswers)
    this.student.submitSimulateExam(clearAnswers).subscribe( (response: any)=> {
      console.log('submitSimulate response: ', response)
      if(response.status && response.result){
        this.presentAlertResult(response.result.studentResult, response.result.finalResult)
      }else {
        this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.server_problem'))
      }
      this.isSubmitting = false
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
          cssClass: 'alert_cancel_button',
          handler: (blah) => {
            this.questions = []
            this.answers = []
            this.menu.open()
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.translate.instant('SIMULATEPAGE.num_alert_again'),
          cssClass: 'alert_Ok_button',
          handler: () => {
            console.log('Confirm Okay');
            this.questions = []
            this.answers = []
            this.showRadio()
          }
        }
      ]
    });

    await alert.present();
  }
}

import { environment } from './../../../../environments/environment';
import { StudentService } from './../../../services/student.service';
import { NavController } from '@ionic/angular';
import { Exam } from './../../../interfaces/exam';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pervious-running-exams',
  templateUrl: './pervious-running-exams.page.html',
  styleUrls: ['./pervious-running-exams.page.scss'],
})
export class PerviousRunningExamsPage implements OnInit {
  cardsArray : any[]=[
    {title: 'exam 1'},
    {title: 'exam 2'},
    {title: 'exam 3'},
    {title: 'exam 4'},
    {title: 'exam 5'},
    {title: 'exam 6'},
  ]
  exams: Exam [] = []
  allExams: Exam [] = []
  isLoading: boolean = false
  isOpen : boolean = false
  indexSelected : number = -1
  constructor(private student: StudentService, private nav: NavController) { }

  ngOnInit() {
    this.isLoading = true
    if(this.student.previousRunningExamsCash.length > 0){
      this.allExams = this.student.previousRunningExamsCash
      this.exams = this.allExams.slice(0 , environment.SIZEOFRELOADING)
      this.isLoading = false
    }
    this.student.getPreviousRunningExams().subscribe( (response: any)=>{
      console.log('final exams response: ', response)
      if(response.status && response.errorNum == 200 && response.exams){
        this.allExams = response.exams
        this.student.previousRunningExamsCash = this.allExams
        this.exams = this.allExams.slice(0 , environment.SIZEOFRELOADING)
      }else if(!response.status && response.errorNum == "api_token required to login"){
        this.nav.navigateRoot('/user/login')
      }
      this.isLoading = false
    })
  }

  loadData(event){
    if (this.allExams.length > this.exams.length) {
      let l = this.allExams.length - this.exams.length
      console.log('Diff: ', l)
      if (l >= environment.SIZEOFRELOADING) {
        console.log('Adding 10 cards')
        this.exams = this.allExams.slice(0, this.exams.length + environment.SIZEOFRELOADING)
      } else {
        console.log('Adding all')
        this.exams = this.allExams.slice(0)
      }
    } else { console.log('no more data to show')
    }
    event.target.complete();
  }
}

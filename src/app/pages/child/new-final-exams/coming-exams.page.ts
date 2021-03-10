import { environment } from './../../../../environments/environment';
import { Exam } from './../../../interfaces/exam';
import { NavController } from '@ionic/angular';
import { StudentService } from './../../../services/student.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coming-exams',
  templateUrl: './coming-exams.page.html',
  styleUrls: ['./coming-exams.page.scss'],
})
export class ComingExamsPage implements OnInit {
  exams: Exam [] = []
  allExams: Exam [] = []
  isLoading: boolean = false
  constructor(private student: StudentService, private nav: NavController) {
  }

  ngOnInit() {
    this.isLoading = true
    if(this.student.newFinalExamsCash.length > 0){
      this.allExams = this.student.newFinalExamsCash
      this.exams = this.allExams.slice(0 , environment.SIZEOFRELOADING)
      this.isLoading = false
    }
    this.student.getNewFinalExams().subscribe( (response: any)=>{
      console.log('final exams response: ', response)
      if(response.status && response.errorNum == 200 && response.exams){
        this.allExams = response.exams.reverse()
        this.student.newFinalExamsCash = this.allExams
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

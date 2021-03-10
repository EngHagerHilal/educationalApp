import { environment } from './../../../../environments/environment';
import { Homework } from './../../../interfaces/homework';
import { StudentService } from './../../../services/student.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pervious-homework',
  templateUrl: './pervious-homework.page.html',
  styleUrls: ['./pervious-homework.page.scss'],
})
export class PerviousHomeworkPage implements OnInit {
  cardsArray : any[]=[
    {title: 'exam 1'},
    {title: 'exam 2'},
    {title: 'exam 3'},
    {title: 'exam 4'},
    {title: 'exam 5'},
    {title: 'exam 6'},
  ]
  homework: Homework [] = []
  allHomework: Homework [] = []
  isLoading: boolean = false
  isOpen : boolean = false
  indexSelected : number = -1
  constructor(private student: StudentService, private nav: NavController) { }

  ngOnInit() {
    this.isLoading = true
    if(this.student.previousHomeworksCash.length > 0){
      this.allHomework = this.student.previousHomeworksCash
      this.homework = this.allHomework.slice(0 , environment.SIZEOFRELOADING)
      this.isLoading = false
    }
    this.student.getPreviousHomeworks().subscribe( (response: any)=>{
      console.log('previous Homeworks response: ', response)
      if(response.status && response.errorNum == 200 && response.homework){
        this.allHomework = response.homework
        this.student.previousHomeworksCash = this.allHomework
        this.homework = this.allHomework.slice(0 , environment.SIZEOFRELOADING)
      }else if(!response.status && response.errorNum == "api_token required to login"){
        this.nav.navigateRoot('/user/login')
      }
      this.isLoading = false
    })
  }

}

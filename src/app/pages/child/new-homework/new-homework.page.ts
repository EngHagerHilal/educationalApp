import { environment } from './../../../../environments/environment';
import { Homework } from './../../../interfaces/homework';
import { StudentService } from './../../../services/student.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-homework',
  templateUrl: './new-homework.page.html',
  styleUrls: ['./new-homework.page.scss'],
})
export class NewHomeworkPage implements OnInit {
  homework: Homework [] = []
  allHomework: Homework [] = []
  isLoading: boolean = false
  isOpen : boolean = false
  indexSelected : number = -1
  constructor(private student: StudentService, private nav: NavController) { }

  ngOnInit() {
    this.isLoading = true
    if(this.student.newHomeworksCash.length > 0){
      this.allHomework = this.student.newHomeworksCash
      this.homework = this.allHomework.slice(0 , environment.SIZEOFRELOADING)
      this.isLoading = false
    }
    this.student.getNewHomeworks().subscribe( (response: any)=>{
      console.log('New Homeworks response: ', response)
      if(response.status && response.errorNum == 200 && response.homework){
        this.allHomework = response.homework
        this.student.newHomeworksCash = this.allHomework
        this.homework = this.allHomework.slice(0 , environment.SIZEOFRELOADING)
      }else if(!response.status && response.errorNum == "api_token required to login"){
        this.nav.navigateRoot('/user/login')
      }
      this.isLoading = false
    })
  }

  loadData(event){
    if (this.allHomework.length > this.homework.length) {
      let l = this.allHomework.length - this.homework.length
      console.log('Diff: ', l)
      if (l >= environment.SIZEOFRELOADING) {
        console.log('Adding 10 cards')
        this.homework = this.allHomework.slice(0, this.homework.length + environment.SIZEOFRELOADING)
      } else {
        console.log('Adding all')
        this.homework = this.allHomework.slice(0)
      }
    } else { console.log('no more data to show')
    }
    event.target.complete();
  }

}

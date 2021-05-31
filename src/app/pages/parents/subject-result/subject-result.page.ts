import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Subject } from './../../../interfaces/subject';
@Component({
  selector: 'app-subject-result',
  templateUrl: './subject-result.page.html',
  styleUrls: ['./subject-result.page.scss'],
})
export class SubjectResultPage implements OnInit {
  subjectData: Subject
  subjectsData: Subject [] = []
  type: number
  totalGrades: number
  constructor(public navParams: NavParams) { }

  ngOnInit() {
    this.subjectData = this.navParams.data['obj']
    this.subjectsData = this.navParams.data['objs']
    this.type = this.navParams.data['type']
    if(this.subjectsData && this.subjectsData.length > 0) {
      for (let index = 0; index < this.subjectsData.length; index++) {
        const element = this.subjectsData[index];
        this.totalGrades += element.studentResult
      }
    }
    console.log('total grades: ', this.totalGrades)
  }

}

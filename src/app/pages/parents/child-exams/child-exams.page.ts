import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ParentService } from './../../../services/parent.service';
import { User } from './../../../interfaces/user';

@Component({
  selector: 'app-child-exams',
  templateUrl: './child-exams.page.html',
  styleUrls: ['./child-exams.page.scss'],
})
export class ChildExamsPage implements OnInit {
  myId = null
  type = null
  tab = "running"
  isOpen : boolean = false
  isLoading : boolean = false
  indexSelected : number = -1
  newExams: any [] = []
  previousExams: any [] = []
  myStudent: User = {}
  constructor(public nav: NavController, private activatedRoute: ActivatedRoute, private parent: ParentService) { }

  ngOnInit() {
    this.isLoading = true
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    console.log('myId: ', this.myId)
    this.parent.getExamsList(this.myId).subscribe( (response: any)=>{
      console.log('child exams response: ', response)
      if(response.status && response.data.exams && response.data.user) {
        this.newExams = response.data.exams.new
        this.previousExams = response.data.exams.previous
        this.myStudent = response.data.user
      }
      this.isLoading = false
    })
  }

}

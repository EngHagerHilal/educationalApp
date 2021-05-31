import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { SubjectResultPage } from './../subject-result/subject-result.page';
import { ActivatedRoute } from '@angular/router';
import { ParentService } from './../../../services/parent.service';
import { Student } from './../../../interfaces/student';

@Component({
  selector: 'app-chlid-profile',
  templateUrl: './chlid-profile.page.html',
  styleUrls: ['./chlid-profile.page.scss'],
})
export class ChlidProfilePage implements OnInit {
  myId = null
  myStudentData: Student = {subjects: []}
  isLoading: boolean = false
  constructor(public nav: NavController, private popoverCtr: PopoverController, private activatedRoute: ActivatedRoute,
    private parent: ParentService) { }

  ngOnInit() {
    // this.menu.enable(false)
    this.isLoading = true
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('myId: ', this.myId)
    this.parent.getStudentData(this.myId).subscribe( (response: any)=>{
      console.log('StudentData response: ', response)
      if(response?.status && response?.studentData){
        this.myStudentData = response?.studentData
        console.log('test: ', this.myStudentData?.subjects)
        this.isLoading = false
      }
    })
  }

  async presentResultPopover(subject, type) {
    let subjectData = {}
    if (type == 1) {
      subjectData ={objs: subject, type: type}
    }else subjectData ={obj: subject, type: type}
    const popover = await this.popoverCtr.create({
      component: SubjectResultPage,
      componentProps: subjectData,
      cssClass: 'subjectResults',
      translucent: true
    });
    return await popover.present();
  }

}

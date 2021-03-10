import { AuthService } from './../../../services/auth.service';
import { StudentService } from './../../../services/student.service';
import { Subject } from './../../../interfaces/subject';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-of-subjects',
  templateUrl: './result-of-subjects.page.html',
  styleUrls: ['./result-of-subjects.page.scss'],
})
export class ResultOfSubjectsPage implements OnInit {
  subjects: Subject[] = []
  searchClicked: boolean = false
  isLoading: boolean = false
  constructor(private student: StudentService, private auth: AuthService) { }

  ngOnInit() {
    if(this.student.studentDataCash?.subjects) this.subjects = this.student.studentDataCash.subjects
    else{
      this.isLoading = true
      this.auth.getMyDataAsStudent().subscribe( (response: any)=> {
        console.log('my data: ', response)
        if(response.status && response.studentData){
          this.subjects = response.studentData.subjects
          this.student.studentDataCash = response.studentData
        }
        this.isLoading = false
      })
    }
    console.log('subjects: ', this.student.studentDataCash)
  }

}

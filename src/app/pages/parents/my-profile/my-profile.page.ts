import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './../../../services/language.service';
import { UiControllerFunService } from './../../../services/uiControllerFun.service';
import { ParentService } from './../../../services/parent.service';
import { Exam } from './../../../interfaces/exam';
import { Student } from './../../../interfaces/student';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  isOpen : boolean = false
  isLoading : boolean = false
  indexSelected : number = -1
  examsList : {exam?: Exam, student?: Student}[] = []
  allExamsList : {exam?: Exam, student?: Student}[] = []
  constructor(public alertController: AlertController, private translate: TranslateService,
    public language: LanguageService, private uiService: UiControllerFunService, private parent: ParentService,
    private menuCtrl: MenuController) { }

  ngOnInit() {
  }
  ionViewWillEnter(ev?){
    this.menuCtrl.enable(true);
    this.isLoading = true
    if(this.parent.myProfileExamsCash.length > 0){
      this.allExamsList = this.parent.myProfileExamsCash
      this.isLoading = false
    }
    this.parent.latestExams().subscribe( (response: any)=> {
      console.log('latestExams response: ', response)
      if(response.status && response.exams){
        this.allExamsList = response.exams
        this.parent.myProfileExamsCash = this.allExamsList
        this.examsList = this.allExamsList.slice(0 , environment.SIZEOFRELOADING)
      }
      this.isLoading = false
      if(ev){
        ev.target.complete();
      }
    })
  }
  loadData(event){
    if (this.allExamsList.length > this.examsList.length) {
      let l = this.allExamsList.length - this.examsList.length
      console.log('Diff: ', l)
      if (l >= environment.SIZEOFRELOADING) {
        console.log('Adding 10 cards')
        this.examsList = this.allExamsList.slice(0, this.examsList.length + environment.SIZEOFRELOADING)
      } else {
        console.log('Adding all')
        this.examsList = this.allExamsList.slice(0)
      }
    } else { console.log('no more data to show')
    }
    event.target.complete();
  }
  async presentAlertAdd() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: this.translate.instant('MENU.adding_alert_header'),
      message: this.translate.instant('MENU.adding_alert_message'),
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: this.translate.instant('MENU.adding_alert_code'),
          // cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: this.translate.instant('MENU.adding_alert_cancel'),
          role: 'cancel',
          cssClass: 'alert_cancel_button',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: this.translate.instant('MENU.adding_alert_add'),
          cssClass: 'alert_Ok_button',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
  async changeLanguage(lg : string){
    await this.uiService.presentLoading(this.translate.instant('TOASTMESSAGES.please_wait'))
    this.language.setLanguage(lg)
    setTimeout(() => {
      this.uiService.dissmisloading()
    }, 500);
  }
}

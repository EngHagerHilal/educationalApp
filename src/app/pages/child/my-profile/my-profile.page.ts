import { StudentService } from './../../../services/student.service';
import { Student } from './../../../interfaces/student';
import { UiControllerFunService } from './../../../services/uiControllerFun.service';
import { AuthService } from './../../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  passwords: {currentPass?: string, newPass?: string, ConfirmNewPass?: string} = {}
  studentData: Student = {}
  isLoading: boolean = false
  constructor(private alertController: AlertController, private translate: TranslateService, private menuCtrl: MenuController,
    private auth: AuthService, private student: StudentService, private ui: UiControllerFunService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.passwords.currentPass = this.auth.userData.password
    this.isLoading = true
    if(this.student.studentDataCash?.user){
      this.studentData = this.student.studentDataCash
      this.isLoading = false
    }
    this.auth.getMyDataAsStudent().subscribe( (response: any)=> {
      console.log('my data: ', response)
      if(response.status && response.studentData){
        this.studentData = response.studentData
        this.student.studentDataCash = this.studentData
      }else if(!response.status && response.errorNum == "login failed"){
        this.student.logOut()
      }
      this.isLoading = false
    })
  }
  async alertEditProfile(){
    console.log('clicked')
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: this.translate.instant('MYPROFILE.edit_alert_header'),
      message: this.translate.instant('MYPROFILE.edit_alert_message'),
      inputs: [
        {
          name: 'current',
          type: 'text',
          placeholder: this.translate.instant('MYPROFILE.edit_alert_current'),
        },
        {
          name: 'new',
          type: 'text',
          placeholder: this.translate.instant('MYPROFILE.edit_alert_new'),
        },
        {
          name: 'confirm',
          type: 'text',
          placeholder: this.translate.instant('MYPROFILE.edit_alert_confirm'),
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
          text: this.translate.instant('MYPROFILE.edit_alert_Bedit'),
          cssClass: 'alert_Ok_button',
          handler: (data) => {
            console.log('Confirm Ok');
            this.changePassword(data)
          }
        }
      ]
    });

    await alert.present();
  }
  changePassword(alertData) {
    if (alertData.current && alertData.new && alertData.confirm) {
      console.log('All', alertData)
      if (alertData.current == this.passwords.currentPass) {
        if (alertData.new.length >= 8 && alertData.new == alertData.confirm) { 
          if(alertData.new != this.passwords.currentPass){
            this.ui.presentToast(this.translate.instant('TOASTMESSAGES.please_wait'))
            this.passwords.newPass = alertData.new
            this.passwords.ConfirmNewPass = alertData.confirm
            this.auth.changePassword(this.passwords).subscribe( (response: any)=> {
              console.log('changepassword response: ', response)
              if(response.status && response.errorNum == 200){
                this.passwords.currentPass = this.passwords.newPass
                this.auth.userData.password = this.passwords.newPass
                localStorage.setItem('ZEDNY_USERDAtA', JSON.stringify(this.auth.userData))
                this.ui.presentToast(this.translate.instant('TOASTMESSAGES.change_password_success'))
              }else {
                this.ui.presentToast(this.translate.instant('TOASTMESSAGES.change_password_required_alert'))
              }
            })
          }else {
            this.ui.presentToast(this.translate.instant('TOASTMESSAGES.change_same_passwords_alert'))
          }
        }
        else { 
          this.ui.presentToast(this.translate.instant('TOASTMESSAGES.change_not_match_length_alert'))
          this.alertEditProfile()
        }
      } else {
        this.ui.presentToast(this.translate.instant('TOASTMESSAGES.change_current_not_match_alert'))
        this.alertEditProfile()
      }
    } else {
      this.ui.presentToast(this.translate.instant('TOASTMESSAGES.change_password_required_alert'))
      this.alertEditProfile()
    }
  }
}

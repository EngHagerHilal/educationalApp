import { StudentService } from './services/student.service';
import { AuthService } from './services/auth.service';
import { UiControllerFunService } from './services/uiControllerFun.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import { Component, OnInit } from '@angular/core';

import { Platform, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ParentService } from './services/parent.service';
import { Student } from './interfaces/student';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public SubselectedIndex = -1;
  public appPages = [
    {
      title: 'MENU.homePage',
      url: '/child/myProfile',
      icon: 'home',
      open: false
    },
    {
      title: 'MENU.finalexams',
      children: [
        { title: 'MENU.newfinalexams', url: '/child/newFinalExams', icon: 'mail' },
        { title: 'MENU.previousfinalexams', url: '/child/previousFinalExams', icon: 'archive' },
      ],
      open: false
    },
    {
      title: 'MENU.runningexams',
      children: [
        { title: 'MENU.newrunningexams', url: '/child/newRunningExams', icon: 'play-circle' },
        { title: 'MENU.previousrunningexams', url: '/child/perviousRunningExams', icon: 'layers' },
      ],
      open: false
    },
    {
      title: 'MENU.homework',
      children: [
        { title: 'MENU.newhomework', url: '/child/newHomework', icon: 'create' },
        { title: 'MENU.previoushomework', url: '/child/perviousHomework', icon: 'create' },
      ],
      open: false
    },
    {
      title: 'MENU.simulateexam',
      url: '/child/simulateExam',
      icon: 'thumbs-up',
      open: false
    },
    {
      title: 'MENU.results',
      url: '/child/resultOfSubjects',
      icon: 'checkmark-done',
      open: false
    }
  ];
  public children: Student[] = [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    public language: LanguageService,
    private translate: TranslateService,
    private uiService: UiControllerFunService,
    public auth: AuthService,
    public alertController: AlertController,
    public student: StudentService,
    public parent: ParentService,
    private event: EventEmitter
  ) {
    this.initializeApp();
    this.event.addListener('updateChildren' , ()=> {
      this.children = this.parent.myChildrenCash
      console.log('updateChildren fire', this.children)
     })
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      if(localStorage.getItem('ZEDNY_USERDAtA')) {
        this.auth.userData = JSON.parse(localStorage.getItem('ZEDNY_USERDAtA'));
        console.log('user logged: ', this.auth.userData)
        await this.auth.getMyData().subscribe( (response: any)=> {
          console.log('getMyData response: ', response)
          if(response.status && response.user){
            response.user.API_Token = this.auth.userData.API_Token
            response.user.password = this.auth.userData.password
            this.auth.userData = response.user
            localStorage.setItem('ZEDNY_USERDAtA', JSON.stringify(this.auth.userData))
            console.log('after update mydata: ', JSON.parse(localStorage.getItem('ZEDNY_USERDAtA')))
            
          }else if(!response.status && response.errorNum == "login failed"){
            this.parent.logOut()
            this.student.logOut()
            this.navCtrl.navigateRoot('/user/login')
          }
        })
        if (this.auth.userData.type == 'student'){
          this.navCtrl.navigateRoot('/child/myProfile')
        }
        if(this.auth.userData.type == 'parent') {
          this.parent.getMyChildrenList().subscribe( (response: any)=> {
            console.log('mychildren response: ', response)
            if(response.status && response.child){
              this.children = response.child
            }else if(!response.status && response.errorNum == "login failed"){
              this.parent.logOut()
              this.navCtrl.navigateRoot('/user/login')
            }else {
              console.log('ERR..in child list')
            }
          })
          this.navCtrl.navigateRoot('/parents/myProfile')
        }
      }
      this.language.setInitialAppLanguage();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname;
    console.log('path: ', path)
    if (path != undefined) {
      for (let index = 0; index < this.appPages.length; index++) {
        const element = this.appPages[index];
        if(element.url && element.url.toLowerCase() === path.toLowerCase()){
          this.selectedIndex = index
        }

        if(element.children){
          for (let subindex = 0; subindex < element.children.length; subindex++) {
            const subElement = element.children[subindex];
            if(subElement.url && subElement.url.toLowerCase() === path.toLowerCase()){
              element.open= true
              this.selectedIndex = index
              this.SubselectedIndex = subindex
              break;
            }
          }
        }
      }
    }
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
          placeholder: this.translate.instant('MENU.adding_alert_code')
          // cssClass: 'specialClass',
          // attributes: {
          //   maxlength: 4,
          //   inputmode: 'decimal'
          // }
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
          handler: (data) => {
            console.log('Confirm Ok');
            if(!data.code || data.code == ''){
              console.log('required')
              this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.add_child_validation'))
              this.presentAlertAdd()
            }else{
              this.addChild(data.code)
            }
          }
        }
      ]
    });

    await alert.present();
  }
  addChild(code){
    this.parent.addNewChild(code).subscribe( (response: any)=>{
      console.log('add child response: ', response)
      if(response.status && response.msg == "تم إضافة ولي أمر للطالب" && response.child){
        console.log('add_child_successfully')
        this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.add_child', response.child))
        this.children.push(response.child)
        this.parent.myChildrenCash = this.children
      }else if(!response.status && response.msg == "الطالب غير موجود"){
        this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.add_child_not_found'))
      }else if(response.status && response.msg == "عفوا تم ربط ولي الأمر مع هذا الطالب من قبل "){
        this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.add_child_available'))
      }else {
        this.uiService.presentToast(this.translate.instant('TOASTMESSAGES.ERR_Not_Knowen'))
      }
    })
  }
  async changeLanguage(lg : string){
    await this.uiService.presentLoading(this.translate.instant('TOASTMESSAGES.please_wait'))
    this.language.setLanguage(lg)
    setTimeout(() => {
      this.uiService.dissmisloading()
    }, 500);
  }
}

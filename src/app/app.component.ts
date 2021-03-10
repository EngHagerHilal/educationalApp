import { StudentService } from './services/student.service';
import { AuthService } from './services/auth.service';
import { UiControllerFunService } from './services/uiControllerFun.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import { Component, OnInit } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
  public children = ['Eyad', 'Elyn', 'Youns'];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertController: AlertController,
    public language: LanguageService,
    private translate: TranslateService,
    private uiService: UiControllerFunService,
    public auth: AuthService,
    public student: StudentService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      if(localStorage.getItem('ZEDNY_USERDAtA')) {
        this.auth.userData = JSON.parse(localStorage.getItem('ZEDNY_USERDAtA'));
        console.log('user logged: ', this.auth.userData)
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
  async changeLanguage(lg : string){
    await this.uiService.presentLoading(this.translate.instant('TOASTMESSAGES.please_wait'))
    this.language.setLanguage(lg)
    setTimeout(() => {
      this.uiService.dissmisloading()
    }, 500);
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
}

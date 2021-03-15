import { LanguageService } from './../../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { UiControllerFunService } from './../../../services/uiControllerFun.service';
import { MenuController, NavController } from '@ionic/angular';
import { User } from './../../../interfaces/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isForget :boolean = false
  form :User = {}
  isClicked :boolean = false
  constructor(private auth: AuthService, private navCtr: NavController, private ui: UiControllerFunService,
    private translate: TranslateService, private menuCtrl: MenuController, public language: LanguageService) {
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  async changeLanguage(lg : string){
    await this.ui.presentLoading()
    this.language.setLanguage(lg)
    setTimeout(() => {
      this.ui.dissmisloading()
    }, 500);
  }

  login(){
    this.isClicked = true
    this.auth.login(this.form).subscribe( (response: any)=> {
      console.log('login response: ', response)
      if(response.status && response.user?.API_Token){
        response.user.password = this.form.password
        this.auth.userData = response.user
        localStorage.setItem('ZEDNY_USERDAtA', JSON.stringify(this.auth.userData))
        if(response.user?.type == "student") this.navCtr.navigateRoot('/child/myProfile')
      }else if(response.status && response.msg == "your account need to active check your mail inbox to active"){
        this.ui.presentToast(this.translate.instant('TOASTMESSAGES.login_need_activation'))
      }else {
        this.ui.presentToast(this.translate.instant('TOASTMESSAGES.login_faild'))
      }
      this.isClicked = false
    })
  }
}

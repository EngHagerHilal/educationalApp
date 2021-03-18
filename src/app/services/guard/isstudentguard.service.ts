import { TranslateService } from '@ngx-translate/core';
import { UiControllerFunService } from './../uiControllerFun.service';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsstudentguardService {

  constructor(private navCtr: NavController, private uiSer:UiControllerFunService, private translate : TranslateService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise( resolve => {
      let user: any = JSON.parse(localStorage.getItem('ZEDNY_USERDAtA'))
      // console.log('guard user: ', user)
      if(user){
        if(user.type == "student"){
          resolve(true)
        }else {
          this.uiSer.presentToast('TOASTMESSAGES.notAllowedGuard')
        }
      }else {
        resolve(false)
        // this.uiSer.presentToast(this.translate.instant('TOASTMESSAGES.isloginGuard'))
        this.navCtr.navigateRoot('user/login')
      }
    })
  }
}

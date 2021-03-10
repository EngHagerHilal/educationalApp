import { TranslateService } from '@ngx-translate/core';
import { UiControllerFunService } from './../uiControllerFun.service';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsloginguardService implements CanActivate{

  constructor(private navCtr: NavController, private uiSer:UiControllerFunService, private translate : TranslateService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise( resolve => {
      if(localStorage.getItem('ZEDNY_USERDAtA')){
        resolve(false)
        this.uiSer.presentToast(this.translate.instant('TOASTMESSAGES.notAllowedGuard'))
      }else {
        resolve(true)
      }
    })
  }
}

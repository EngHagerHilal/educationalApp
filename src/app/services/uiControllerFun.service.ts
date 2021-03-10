import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';
@Injectable()

export class UiControllerFunService {
    loader:any;
    modal:any;
    pages: Array<{index:number, title: string, component: any , icon:string, isActive:boolean,isLogIn?:any}>;
  constructor(private toastCtrl: ToastController,private loadingCtrl: LoadingController, private alertCtrl:AlertController,
    private modalController: ModalController, private popoverController: PopoverController) { }
  
  async presentToast(msg:string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentModal(pagename) {
    const modal = await this.modalController.create({
      component: pagename
    });
    return await modal.present();
  }
  dismissModal() {
    this.modalController.dismiss();
  }

  async presentPopover(pagename,ev: any,header: string) {
    const popover = await this.popoverController.create({
      component: pagename,
      event: ev,
      translucent: true,
      componentProps: {data: {title: header}}
    });
    return await popover.present();
  }
  dismissPopover() {
    this.popoverController.dismiss();
  }

  async presentLoading(message?: string) {
    let m: string
    if(message) m = message
    else m = "Please wait..."
    this.loader = await this.loadingCtrl.create({
      message: m
    });
    await this.loader.present();
  }

  dissmisloading(){
    this.loader.dismiss();
  }

  async showBasicAlertWithTranslate(titletxt:string , masstxt:string, buttOk: string) {
    const alert = await this.alertCtrl.create({
      header: titletxt,
      subHeader: masstxt,
      buttons: [buttOk]
    });
    alert.present();
  }

}
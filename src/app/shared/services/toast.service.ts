import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

export enum ToastColors {
  error = 'danger',
  success = 'success',
  info = 'warning'
}

export enum ToastIcons {
  error = 'alert-circle-outline',
  success = 'checkmark-circle-outline',
  info = 'information-circle'
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast: HTMLIonToastElement;

  constructor(public toastController: ToastController) { }

  async present(type: string, message: string, duration: number = 2000) {
    try {
      this.toast.dismiss();
    } catch (e) { }

    this.toast = await this.toastController.create({
      message,
      duration,
      color: ToastColors[type],
      icon: ToastIcons[type],
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        }
      ]
    });
    this.toast.present();
  }

}
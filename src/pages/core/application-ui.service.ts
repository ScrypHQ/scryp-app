import { Injectable } from '@angular/core';
import { ToastController, LoadingController, Loading, AlertController } from 'ionic-angular';

@Injectable()
export class ApplicationUiService {

  private loader: Loading;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController) { }

  showErrorAlert(title: string, message: string) {
    const alert = this.alertController.create({
      title: title,
      message: message,
      enableBackdropDismiss: false,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showErrorToast(message: string) {
    const toast = this.toastController.create({
      message: message,
      duration: 15000,
      position: 'bottom',
      showCloseButton: true,
      cssClass: 'error-toast'
    });

    toast.present();
  }

  showLoader(message: string) {
    this.loader = this.loadingController.create({
      content: message
    });
    this.loader.present();
  }

  hideLoader() {
    this.loader.dismiss();
  }

  formatBankNameDisplay(bankName: string): string {
    return bankName.slice(0, 20);
  }

  getLastFourDigitString(bankNumber: any): string {
    const dataValue = bankNumber.toString();
    return dataValue.slice(-4);
  }
}
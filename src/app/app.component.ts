import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ScrypWalletPage } from '../pages/scryp-wallet/scryp-wallet';
import { ScrypOffersPage } from '../pages/scryp-offers/scryp-offers';
import { ScrypVolunteerPage } from '../pages/scryp-volunteer/scryp-volunteer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') public nav: NavController;
  rootPage:any = LoginPage;
  showedAlert = false;
  confirmAlert :any;
  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public alert: AlertController) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.platform.registerBackButtonAction(() => {
        const view = this.nav.getActive();
        if (view.component == ScrypWalletPage ||
          view.component == ScrypOffersPage ||
          view.component == ScrypVolunteerPage ) {
            if (!this.showedAlert) {
              this.confirmExitApp();
            } else {
              this.showedAlert = false;
              this.confirmAlert.dismiss();
            }
        } else if (view.component == LoginPage) {
          this.confirmExitApp();
        } else {
          this.nav.pop();
        }
      });
    });
  }

  confirmExitApp() {
    this.showedAlert = true;
    this.confirmAlert = this.alert.create({
      title: "Exit App?",
      message: "Are you sure you want to exit App?",
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.showedAlert = false;
            return;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    this.confirmAlert.present();
  }
}


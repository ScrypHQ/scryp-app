import { Component } from '@angular/core';
import { AlertController, LoadingController,NavController } from 'ionic-angular';
import { HomeComponent } from '../home/home.component';

@Component({
  templateUrl: 'signup.html'
})
export class SignupComponent {
  private loading: any = this.loadingCtrl.create({ content: 'Coming soon...'});

  constructor(
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      private navController: NavController,
  ) {
    this.loading.present();
    setTimeout(5000);
    this.loading.dismiss();
    this.navController.setRoot(HomeComponent)
  }

  private profileLoadOnError = (error) => {
    this.loading.dismiss();
  }

  xButtonClick() {
    this.navController.pop();
  }

}

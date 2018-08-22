import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ScrypWalletPage} from "../pages/scryp-wallet/scryp-wallet";
import { StorageService } from '../service/storage.service';
import { ImplicitReceiver } from '../../node_modules/@angular/compiler';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: StorageService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  // async ngOnInit(){
  //   const account = await this.storage.getAccount();
  //   if (!account && !account.address) {
  //     this.rootPage = LoginPage;
  //   } else {
  //     this.rootPage = ScrypWalletPage;
  //   }
  // }
}


import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ScrypOffersPage } from '../scryp-offers/scryp-offers';
import { Web3Service } from '../../service/web3.service';
import { StorageService } from '../../service/storage.service';
import { RecoverPage } from '../recover/recover';

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  privateKey:any;
  submitted = false;

  constructor(public navCtrl: NavController, public web3: Web3Service, public storage: StorageService, public alert: AlertController) { }

  async ngOnInit() {
    const account = await this.storage.getAccount();
    // if (account && account.address) {
    //   this.goToWallet()
    // }
  }

  async onSignup() {
    const mnemonic = await this.web3.createAccount();
    const account = await this.storage.getAccount();
    if (account && account.address) {
      this.goToRecover(mnemonic);
    } else {
      let alert = this.alert.create({
        title: 'Failed',
        subTitle: 'Account creation failed. Retry.',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  onForgotKey() {
    this.navCtrl.push(RecoverPage);
  }

  goToRecover(mnemonic: string) {
    this.navCtrl.push(RecoverPage, {
      mnemonic: mnemonic
    });
  }

  goToWallet() {
    this.navCtrl.setRoot(ScrypOffersPage)
  }
}
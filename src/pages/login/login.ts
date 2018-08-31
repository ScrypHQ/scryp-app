import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Web3Service } from '../../service/web3.service';
import { StorageService } from '../../service/storage.service';
import { RecoverPage } from '../recover/recover';
import { ScrypWalletPage } from '../scryp-wallet/scryp-wallet';

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  privateKey:any;
  submitted = false;

  constructor(public navCtrl: NavController, public web3: Web3Service, public storage: StorageService, public alert: AlertController, public loadingCtrl: LoadingController) { }

  async ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: 'Checking account status. Please wait...'
    });
  
    loading.present();
    const account = await this.storage.getAccount();
    loading.dismiss();
    if (account && account.address) {
      this.goToWallet()
    }
  }

  async onSignup() {
    let loading = this.loadingCtrl.create({
      content: 'Talking to the blockchain...'
    });
  
    loading.present();
    const mnemonic = await this.web3.createAccount();
    const account = await this.storage.getAccount();
    loading.dismiss();
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
    this.navCtrl.setRoot(ScrypWalletPage);
  }
}

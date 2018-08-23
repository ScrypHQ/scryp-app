import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Web3Service } from '../../service/web3.service';
import { StorageService } from '../../service/storage.service';
import { ScrypWalletPage } from '../scryp-wallet/scryp-wallet';

/**
 * Generated class for the RecoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-recover',
  templateUrl: 'recover.html',
})
export class RecoverPage {
  mnemonic: string;
  isLoggedIn = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public web3: Web3Service, public storage: StorageService, public alert: AlertController, private loadingCtrl: LoadingController) {
    if (this.navParams.get('mnemonic')) {
      this.isLoggedIn = true;
    }
    this.mnemonic = this.navParams.get('mnemonic');
  }

  goToWallet() {
    this.navCtrl.setRoot(ScrypWalletPage)
  }

  async recover() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    const account = this.web3.restoreAccount(this.mnemonic);
    loading.dismiss();
    if (account && account.address) {
      this.goToWallet();
    } else {
      let alert = this.alert.create({
        title: 'Failed',
        subTitle: 'Account Recovery failed. Retry.',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }
}

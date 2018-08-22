import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ScrypOffersPage } from '../scryp-offers/scryp-offers';
import { Web3Service } from '../../service/web3.service';
import { StorageService } from '../../service/storage.service';

/**
 * Generated class for the RecoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recover',
  templateUrl: 'recover.html',
})
export class RecoverPage {
  mnemonic: string;
  isLoggedIn = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public web3: Web3Service, public storage: StorageService, public alert: AlertController) {
    if (this.navParams.get('mnemonic')) {
      this.isLoggedIn = true;
    }
    this.mnemonic = this.navParams.get('mnemonic');
  }

  goToWallet() {
    this.navCtrl.setRoot(ScrypOffersPage)
  }

  async recover() {
    const account = this.web3.restoreAccount(this.mnemonic);
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

  copy() {
    
  }
}

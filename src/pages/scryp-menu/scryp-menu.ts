import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ScrypWalletPage} from "../scryp-wallet/scryp-wallet";
import {ScrypVolunteerPage} from "../scryp-volunteer/scryp-volunteer";
import {ScrypOffersPage} from "../scryp-offers/scryp-offers";
import {ScrypFriendsPage} from "../scryp-friends/scryp-friends";

/**
 * Generated class for the ScrypMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-scryp-menu',
  templateUrl: 'scryp-menu.html',
})
export class ScrypMenuPage {

  mapPageObject: any;
  callback: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mapPageObject = this.navParams.get('pageObject');
    this.callback = this.navParams.get('callback');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScrypMenuPage');
  }

  closeMenu() {
    this.callback(this.mapPageObject).then(()=>{ this.navCtrl.pop() });
  }

  goToWallet() {
    this.navCtrl.setRoot(ScrypWalletPage)
  }

  goToVolunteer() {
    this.navCtrl.setRoot(ScrypVolunteerPage)
  }

  goToOffers() {
    this.navCtrl.setRoot(ScrypOffersPage)
  }

  goToFriend() {
    this.navCtrl.push(ScrypFriendsPage)
  }

}

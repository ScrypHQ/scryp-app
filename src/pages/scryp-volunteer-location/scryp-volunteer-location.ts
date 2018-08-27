import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '../../../node_modules/@ionic-native/barcode-scanner';
import { Web3Service } from '../../service/web3.service';
import { ScrypFriendsPage } from '../scryp-friends/scryp-friends';

/**
 * Generated class for the ScrypVolunteerLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-scryp-volunteer-location',
  templateUrl: 'scryp-volunteer-location.html',
})
export class ScrypVolunteerLocationPage {

  mapPageObject: any;
  callback: any;
  volunteerSite: any;
  scrypActions = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private scanner: BarcodeScanner,
    private loadingCtrl: LoadingController,
    private web3Service: Web3Service,
    private alertCtrl: AlertController) {
    this.mapPageObject = this.navParams.get('pageObject');
    this.callback = this.navParams.get('callback');
    this.volunteerSite = this.navParams.get('volunteerSite');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScrypVolunteerLocationPage');

  }

  goToFriends() {
    this.navCtrl.push(ScrypFriendsPage);
  }

  closeMenu() {
    this.callback(this.mapPageObject).then(()=>{ this.navCtrl.pop() });
  }

  toggleScrypActions() {
    this.scrypActions = !this.scrypActions;
  }

  async addScryp() {
    const info = await this.scanner.scan();
    const values = info.text.split(';');
    if (values[0] != 'Earn') {
      alert('Invalid code scanned');
      return;
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    // scryp add logic goes here
    const result = await this.web3Service.earnScryp(values[1]);
    loading.dismiss();
    if (result) {
      let alert = this.alertCtrl.create({
        title: 'Transaction Successful',
        subTitle: 'Added '+ values[1] + ' Scryp to your wallet.',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Transaction Failed',
        subTitle: 'Could not complete transaction.',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }
}

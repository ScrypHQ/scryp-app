import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '../../../node_modules/@ionic-native/barcode-scanner';

/**
 * Generated class for the ScrypStorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scryp-store',
  templateUrl: 'scryp-store.html',
})
export class ScrypStorePage {

  mapPageObject: any;
  callback: any;
  offer: any;
  scrypActions = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private scanner: BarcodeScanner) {
    this.mapPageObject = this.navParams.get('pageObject');
    this.callback = this.navParams.get('callback');
    this.offer = this.navParams.get('offer');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScrypStorePage');
  }
  closeMenu() {
    this.callback(this.mapPageObject).then(()=>{ this.navCtrl.pop() });
  }

  toggleScrypActions() {
    this.scrypActions = !this.scrypActions;
  }

  async spendScryp() {
    const info = await this.scanner.scan();
    // scryp spend logic goes here
    console.log(info);
    alert(info.text);
  }
}

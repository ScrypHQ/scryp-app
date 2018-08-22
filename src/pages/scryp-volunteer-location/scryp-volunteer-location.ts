import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '../../../node_modules/@ionic-native/barcode-scanner';

/**
 * Generated class for the ScrypVolunteerLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scryp-volunteer-location',
  templateUrl: 'scryp-volunteer-location.html',
})
export class ScrypVolunteerLocationPage {

  mapPageObject: any;
  callback: any;
  volunteerSite: any;
  scrypActions = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private scanner: BarcodeScanner) {
    this.mapPageObject = this.navParams.get('pageObject');
    this.callback = this.navParams.get('callback');
    this.volunteerSite = this.navParams.get('volunteerSite');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScrypVolunteerLocationPage');

  }

  closeMenu() {
    this.callback(this.mapPageObject).then(()=>{ this.navCtrl.pop() });
  }

  toggleScrypActions() {
    this.scrypActions = !this.scrypActions;
  }

  async addScryp() {
    const info = await this.scanner.scan();
    // scryp add logic goes here
    console.log(info);
    alert(info.text);
  }
}

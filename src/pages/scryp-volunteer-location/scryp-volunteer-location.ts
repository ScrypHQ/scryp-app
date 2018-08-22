import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScrypVolunteerLocationPage');
  }

  closeMenu() {
    this.navCtrl.pop()
  }
}

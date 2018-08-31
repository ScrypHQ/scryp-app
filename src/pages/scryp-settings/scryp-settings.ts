import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ScrypSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-scryp-settings',
  templateUrl: 'scryp-settings.html',
})
export class ScrypSettingsPage {
  mapPageObject: any;
  callback: any;
  pushNotification= 'yes';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mapPageObject = this.navParams.get('pageObject');
    this.callback = this.navParams.get('callback');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScrypSettingsPage');
  }
  
  closeMenu() {
    this.callback(this.mapPageObject).then(()=>{ this.navCtrl.pop() });
  }

}

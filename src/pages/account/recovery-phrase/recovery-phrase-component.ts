import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-recovery-phrase',
  templateUrl: 'recovery-phrase.html',
})
export class RecoveryPhrasePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  getBalance(){
    //this.navCtrl.push( BalanceAmountPage );
  }

}

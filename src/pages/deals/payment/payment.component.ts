import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BalanceComponentPage } from '../balance/balance-component';


@Component({
  selector: 'payment',
  templateUrl: 'payment.component.html',
})
export class PaymentConfirmPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  getBalance(){
    this.navCtrl.setRoot( BalanceComponentPage );
  }

}

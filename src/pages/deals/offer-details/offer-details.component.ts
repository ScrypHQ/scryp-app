import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentConfirmPage } from '../payment/payment.component';


@Component({
  selector: 'offer-details',
  templateUrl: 'offer-details.component.html',
})
export class OfferDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  pay(){
    this.navCtrl.push( PaymentConfirmPage );
  }

}

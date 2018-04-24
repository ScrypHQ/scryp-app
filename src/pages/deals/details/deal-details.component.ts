import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OfferDetailsPage } from '../offer-details/offer-details.component';


@Component({
  selector: 'deal-details',
  templateUrl: 'deal-details.component.html',
})
export class DealsDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  getDetails(){
    this.navCtrl.push( OfferDetailsPage );
  }

}

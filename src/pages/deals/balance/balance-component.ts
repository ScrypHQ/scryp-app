import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DealsListComponent } from '../deals.component';


@Component({
  selector: 'balance-component-page',
  templateUrl: 'balance-component.html',
})
export class BalanceComponentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  getDeals(){
    this.navCtrl.push( DealsListComponent );
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DealsDetailsPage } from './details/deal-details.component';

@Component({
  selector: 'deails',
  templateUrl: 'deals.html',
})
export class DealsListComponent {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  getDetails(){
    this.navCtrl.push( DealsDetailsPage );
  }

}

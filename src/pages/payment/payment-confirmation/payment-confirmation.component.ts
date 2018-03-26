import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomeComponent } from '../../home/home.component';

@Component({
  templateUrl: 'payment-confirmation.html',
})
export class PaymentConfirmationComponent {

  constructor(
    private navController: NavController
  ) {
    
  }

  goToHomePage() {
      this.navController.setRoot(HomeComponent);
  }

}

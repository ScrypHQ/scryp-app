
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomeComponent } from '../../home/home.component';
import { PaymentInfo } from '../payment-info';
import { PaymentService } from '../payment.service';
import { ApplicationUiService } from '../../core/application-ui.service';
import { PaymentConfirmationComponent } from '../payment-confirmation/payment-confirmation.component';


@Component({
  templateUrl: 'payment-review.html'
})
export class PaymentReviewComponent {

  paymentInfo: PaymentInfo;
  subEvent: any;

  constructor(
    private navController: NavController,
    private paymentService: PaymentService,
    private applicationUiService: ApplicationUiService
  ) {
    this.paymentInfo = this.paymentService.getPaymentInfo();
  }

  ionViewWillLeave() {    
    this.paymentService.setPaymentInfo(this.paymentInfo);
  }

  submitPayment() {
    this.applicationUiService.showLoader('Sending payment....');
    setTimeout(5000);
    this.applicationUiService.hideLoader();
    this.onPaymentSuccess();
  }

  onPaymentSuccess() {
    this.navController.push(PaymentConfirmationComponent);
  };

  onPaymentCancel() {
    this.navController.setRoot(HomeComponent);
  }
}

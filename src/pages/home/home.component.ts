import { Component } from '@angular/core';
import { NavController, LoadingController, ViewController } from 'ionic-angular';
import { QRScanResponse } from '../payment/qr-scan/qr-scan-response';
import { QRScanService } from '../payment/qr-scan/qr-scan.service';
import { PaymentService } from '../payment/payment.service';
import { PaymentInfo } from '../payment/payment-info';
import { PaymentReviewComponent } from '../payment/payment-review/payment-review.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomeComponent {

  constructor(
    private qrScanService: QRScanService,
    private viewCtrl: ViewController,
    private navController: NavController,
    private paymentService: PaymentService
  ) {
  }

  async scanItem() {
    const barcodeData: QRScanResponse = await this.qrScanService.scanBarcode();

    if (barcodeData.cancelled) {
        return;
    }
    let paymentInfo = new PaymentInfo();
    paymentInfo.walletAddress = barcodeData.text;
    this.paymentService.setPaymentInfo(paymentInfo)
    this.navController.push(PaymentReviewComponent);
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  xButtonClick() {
        this.navController.push(PaymentReviewComponent);
  }
}

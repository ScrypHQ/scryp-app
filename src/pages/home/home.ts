import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { QRScanResponse } from './qr-scan/qr-scan-response';
import { QRScanService } from './qr-scan/qr-scan.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private qrScanService: QRScanService,
    private loadingController: LoadingController,
    private navController: NavController) {

  }

  async scanItem() {
    const me = this;
    const barcodeData: QRScanResponse = await this.qrScanService.scanBarcode();

    if (barcodeData.cancelled) {
        return;
    }

    const loading = this.loadingController.create({
      content: 'Searching...'
    });
    loading.present();
    console.log(barcodeData.text)
  }

  xButtonClick() {
        //this.navController.push();
  }

}

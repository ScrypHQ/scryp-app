import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QRScanResponse } from './qr-scan-response';



@Injectable()
export class QRScanService {

  constructor(private barcodeScanner: BarcodeScanner) {
  }

  async scanBarcode() {
    try {
      const results: QRScanResponse = await this.barcodeScanner.scan({showTorchButton: true, resultDisplayDuration: 0, prompt:''});
      return results;
    } catch (error) {
      console.log(error);
    }
  }
}

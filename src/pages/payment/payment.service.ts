import { Injectable, EventEmitter, Inject } from '@angular/core';
import { PaymentInfo } from './payment-info';


@Injectable()
export class PaymentService {

  public onPaymentDataChange: EventEmitter<PaymentInfo>;

  private paymentInfo: PaymentInfo;

  constructor() {
    this.onPaymentDataChange = new EventEmitter<PaymentInfo>();
  }

  setPaymentInfo(paymentInfo: PaymentInfo) {
    this.paymentInfo = paymentInfo;
    this.onPaymentDataChange.emit(this.paymentInfo);
  }

  getPaymentInfo() {
    return this.paymentInfo;
  }

  sendPayment(paymentInfo: PaymentInfo) {
    
  }

}
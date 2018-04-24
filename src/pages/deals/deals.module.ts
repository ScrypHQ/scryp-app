import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BalanceComponentPage } from './balance/balance-component';
import { DealsDetailsPage } from './details/deal-details.component';
import { DealsListComponent } from './deals.component';
import { OfferDetailsPage } from './offer-details/offer-details.component';
import { PaymentConfirmPage } from './payment/payment.component';

@NgModule({
  declarations: [
    BalanceComponentPage,
    DealsDetailsPage,
    DealsListComponent,
    OfferDetailsPage,
    PaymentConfirmPage
  ],
  entryComponents: [
    BalanceComponentPage,
    DealsDetailsPage,
    DealsListComponent,
    OfferDetailsPage,
    PaymentConfirmPage
  ],
  imports: [
    IonicModule.forRoot(BalanceComponentPage)
  ]
})
export class DealsModule {}

//TODO: Move providers, entry components, declarations to individual modules

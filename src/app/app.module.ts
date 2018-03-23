import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SignupComponent } from '../pages/account/signup.component';
import { HomeComponent } from '../pages/home/home.component';
import { PaymentReviewComponent } from '../pages/payment/payment-review/payment-review.component';
import { PaymentService } from '../pages/payment/payment.service';
import { QRScanService } from '../pages/payment/qr-scan/qr-scan.service';
import { ApplicationUiService } from '../pages/core/application-ui.service';
import { PaymentConfirmationComponent } from '../pages/payment/payment-confirmation/payment-confirmation.component';

@NgModule({
  declarations: [
    MyApp,
    HomeComponent,
    SignupComponent,
    PaymentReviewComponent,
    PaymentConfirmationComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeComponent,
    SignupComponent,
    PaymentReviewComponent,
    PaymentConfirmationComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanService,
    PaymentService,
    BarcodeScanner,
    ApplicationUiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

//TODO: Move providers, entry components, declarations to individual modules

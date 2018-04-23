import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Form} from "@angular/forms";

@Component({
  selector: 'page-recovery-phrase2',
  templateUrl: 'recovery-phrase2.html',
})
export class RecoveryPhrase2Page {
  recoveryWord: string = `First second third fourth fifth sixth
                seventh eigth ninth tenth eleventh twelth`;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
}

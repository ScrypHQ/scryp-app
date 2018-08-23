import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ScrypVolunteerPage } from "../scryp-volunteer/scryp-volunteer";
import { ScrypStorePage } from "../scryp-store/scryp-store";
import { ScrypSettingsPage } from "../scryp-settings/scryp-settings";
import { ScrypMenuPage } from "../scryp-menu/scryp-menu";
import { ScrypVolunteerLocationPage } from "../scryp-volunteer-location/scryp-volunteer-location";
import * as L from 'leaflet';
import '../../../node_modules/leaflet-plugins/layer/tile/Bing.js';
import { Geolocation } from '@ionic-native/geolocation';
import { VolunteerWorkService } from '../../service/volunteer-work.service';
import { OffersService } from '../../service/offers.service';
import { Web3Service } from '../../service/web3.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the ScrypWalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scryp-wallet',
  templateUrl: 'scryp-wallet.html',
})
export class ScrypWalletPage {
  walletData: number;
  map: any;
  BING_KEY = 'At2CX0GyCF3uTS87fnCP_ueLztJa_FruD4mq9iS4peRAb5eVNWOrxyIz7p3kZJtC';
  public volunteerIcon: any = new L.icon({
    iconUrl: 'assets/imgs/scryp-images/volunteer_marker.png',
    iconAnchor: [10, 10]
  });
  public offersIcon: any = new L.icon({
    iconUrl: 'assets/imgs/scryp-images/offer_marker.png',
    iconAnchor: [10, 10]
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,
    // private geolocation: Geolocation,
    private web3Service: Web3Service,
    private volunteerService: VolunteerWorkService, private offersService: OffersService,
    private scanner: BarcodeScanner, private loadingCtrl: LoadingController) {
  }

  async ionViewDidLoad() {
    await this.loadMaps();
  }

  async loadMaps() {
    // const coords = await this.geolocation.getCurrentPosition();
    const center = new L.LatLng(44.9711564, -93.2452265);
    this.map = new L.Map('wallet-map', { zoomControl: false, center: center, zoom: 14 });
    const bingLayer = new L.BingLayer(this.BING_KEY, { type: "Road", maxZoom: 22, maxNativeZoom: 19 });
    this.map.addLayer(bingLayer);
    this.getVolunteerData();
    this.getOffersData();
    this.getBalance();
  }

  goToMenu() {
    this.navCtrl.push(ScrypMenuPage, {
      pageObject: this,
      callback: this.mapCallback
    });
  }

  goToSettings() {
    this.navCtrl.push(ScrypSettingsPage, {
      pageObject: this,
      callback: this.mapCallback
    });
  }

  goToVolunteer() {
    this.navCtrl.setRoot(ScrypVolunteerPage);
  }


  goToStore(offer) {
    this.navCtrl.push(ScrypStorePage, {
      pageObject: this,
      callback: this.mapCallback,
      offer: offer
    });
  }

  goToVolunteerLocation(volunteerSite) {
    this.navCtrl.push(ScrypVolunteerLocationPage, {
      pageObject: this,
      callback: this.mapCallback,
      volunteerSite: volunteerSite
    });
  }

  getVolunteerData() {
    const volunteers = this.volunteerService.GetVolunteerData();
    volunteers.forEach(v => {
      var marker = new L.Marker(new L.LatLng(v.location.latitude, v.location.longitude), { icon: this.volunteerIcon, alt: v.id });
      marker.options.alt = v.id;
      this.map.addLayer(marker);
      marker.on('click', (e) => { this.goToVolunteerLocation(v) });
    });
  }

  getOffersData() {
    const offers = this.offersService.GetOffersData();
    offers.forEach(o => {
      var marker = new L.Marker(new L.LatLng(o.location.latitude, o.location.longitude), { icon: this.offersIcon, alt: o.id });
      marker.options.alt = o.id;
      this.map.addLayer(marker);
      marker.on('click', (e) => { this.goToStore(o) });
    });
  }

  mapCallback(mapPageObject) {
    return new Promise((resolve, reject) => {
      this.map = mapPageObject.map;
      mapPageObject.getBalance();
      resolve();
    });
  }

  async addScryp() {
    // const info = "Earn;10;";
    const info = await this.scanner.scan();
    const values = info.text.split(';');
    if (values[0] != 'Earn') {
      alert('Invalid code scanned');
      return;
    }
    // scryp add logic goes here
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    const result = await this.web3Service.earnScryp(values[1]);
    loading.dismiss();
    if (result) {
      await this.getBalance();
      alert('Scryp Earned');
    } else {
      alert('Failed');
    }
  }

  async spendScryp() {
    // const info = "Spend;4;"
    const info = await this.scanner.scan();
    const values = info.text.split(';');
    if (values[0] != 'Spend') {
      alert('Invalid code scanned');
      return;
    }
    // scryp spend logic goes here
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    const result = await this.web3Service.burnScryp(values[1]);
    loading.dismiss();
    if (result) {
      await this.getBalance();
      alert('Scryp Spent');
    } else {
      alert('Failed');
    }
  }

  async getBalance() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    this.walletData = await this.web3Service.getBalance();
    loading.dismiss();
  }
}

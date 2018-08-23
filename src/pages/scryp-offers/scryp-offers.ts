import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {ScrypStorePage} from "../scryp-store/scryp-store";
import {ScrypSettingsPage} from "../scryp-settings/scryp-settings";
import {ScrypMenuPage} from "../scryp-menu/scryp-menu";
import {ScrypWalletPage} from "../scryp-wallet/scryp-wallet";
import { OffersService } from '../../service/offers.service';
import * as L from 'leaflet';
import '../../../node_modules/leaflet-plugins/layer/tile/Bing.js';
import { Web3Service } from '../../service/web3.service';

/**
 * Generated class for the ScrypOffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-scryp-offers',
  templateUrl: 'scryp-offers.html',
})
export class ScrypOffersPage {
  map: any;
  BING_KEY = 'At2CX0GyCF3uTS87fnCP_ueLztJa_FruD4mq9iS4peRAb5eVNWOrxyIz7p3kZJtC';
  offers: any;
  walletBalance: any;
  public offersIcon: any = new L.icon({
    iconUrl: 'assets/imgs/scryp-images/offer_marker.png',
    iconAnchor: [10, 10]
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, private offersService: OffersService, private loadingCtrl: LoadingController,
    private web3Service: Web3Service) {
  }

  async ionViewDidLoad() {
    await this.loadMaps();
  }

  async loadMaps() {
    // const coords = await this.geolocation.getCurrentPosition();
    const center = new L.LatLng(44.9711564, -93.2452265);
    this.map = new L.Map('offer-map', { zoomControl: false, center: center, zoom: 14 });
    const bingLayer = new L.BingLayer(this.BING_KEY, { type: "Road", maxZoom: 22, maxNativeZoom: 19 });
    this.map.addLayer(bingLayer);
    await this.getOffersData();
    await this.getBalance();
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

  goToWallet() {
    this.navCtrl.setRoot(ScrypWalletPage);
  }

  goToStore(offer) {
    this.navCtrl.push(ScrypStorePage, {
      pageObject: this,
      callback: this.mapCallback,
      offer: offer
    });
  }

  async filterItems(event) {
    if (!event.data) {
      this.offers = await this.offersService.GetOffersData();
    }
    this.offers = this.offers.filter(item => {
      return item.title.toLowerCase().includes(event.target.value.toLowerCase());
    })
  }

  async getOffersData() {
    this.offers = await this.offersService.GetOffersData();
    this.offers.forEach(o => {
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

  async getBalance() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    this.walletBalance = await this.web3Service.getBalance();
    loading.dismiss();
  }
}

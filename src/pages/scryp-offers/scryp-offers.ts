import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ScrypStorePage} from "../scryp-store/scryp-store";
import {ScrypVolunteerLocationPage} from "../scryp-volunteer-location/scryp-volunteer-location";
import {ScrypSettingsPage} from "../scryp-settings/scryp-settings";
import {ScrypMenuPage} from "../scryp-menu/scryp-menu";
import {ScrypWalletPage} from "../scryp-wallet/scryp-wallet";
import { OffersService } from '../../service/offers.service';
import * as L from 'leaflet';
import '../../../node_modules/leaflet-plugins/layer/tile/Bing.js';

/**
 * Generated class for the ScrypOffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scryp-offers',
  templateUrl: 'scryp-offers.html',
})
export class ScrypOffersPage {
  map: any;
  BING_KEY = 'At2CX0GyCF3uTS87fnCP_ueLztJa_FruD4mq9iS4peRAb5eVNWOrxyIz7p3kZJtC';
  public offersIcon: any = new L.icon({
    iconUrl: 'assets/imgs/scryp-images/offer_marker.png',
    iconAnchor: [10, 10]
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, private offersService: OffersService) {
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
    this.getOffersData();
  }

  goToMenu() {
    this.resetMaps();
    this.navCtrl.push(ScrypMenuPage)
  }

  goToSettings() {
    this.resetMaps();
    this.navCtrl.push(ScrypSettingsPage)
  }

  goToWallet() {
    this.resetMaps();
    this.navCtrl.setRoot(ScrypWalletPage)
  }

  goToVolunteerLocation() {
    this.resetMaps();
    this.navCtrl.setRoot(ScrypVolunteerLocationPage)
  }

  goToStore() {
    this.resetMaps();
    this.navCtrl.push(ScrypStorePage)
  }

  getOffersData() {
    const offers = this.offersService.GetOffersData();
    offers.forEach(o => {
      var marker = new L.Marker(new L.LatLng(o.location.latitude, o.location.longitude), { icon: this.offersIcon, alt: o.id });
      marker.options.alt = o.id;
      this.map.addLayer(marker);
      marker.on('click', (e) => { console.log('loaded' + o.id) });
    });
  }

  resetMaps() {
    document.getElementById('offer-map').innerHTML = "<div id='offer-map' style='width:100%; height:50%;'></div>";
  }
}

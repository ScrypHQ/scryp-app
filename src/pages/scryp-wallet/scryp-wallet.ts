import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  walletData: any;
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
    private volunteerService: VolunteerWorkService, private offersService: OffersService, private web3Service: Web3Service) {
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
  }

  goToMenu() {
    this.resetMaps();
    this.navCtrl.setRoot(ScrypMenuPage)
  }

  goToSettings() {
    this.resetMaps();
    this.navCtrl.setRoot(ScrypSettingsPage)
  }

  goToVolunteer() {
    this.resetMaps();
    this.navCtrl.setRoot(ScrypVolunteerPage)
  }


  goToStore() {
    this.resetMaps();
    this.navCtrl.setRoot(ScrypStorePage)
  }

  goToVolunteerLocation() {
    this.resetMaps();
    this.navCtrl.setRoot(ScrypVolunteerLocationPage)
  }

  getVolunteerData() {
    const volunteers = this.volunteerService.GetVolunteerData();
    volunteers.forEach(v => {
      var marker = new L.Marker(new L.LatLng(v.location.latitude, v.location.longitude), { icon: this.volunteerIcon, alt: v.id });
      marker.options.alt = v.id;
      this.map.addLayer(marker);
      marker.on('click', (e) => { console.log('loaded' + v.id) });
    });
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
    document.getElementById('wallet-map').innerHTML = "<div id='wallet-map' style='width:100%; height:50%;'></div>";
  }
}

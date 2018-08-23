import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {ScrypVolunteerLocationPage} from "../scryp-volunteer-location/scryp-volunteer-location";
import {ScrypSettingsPage} from "../scryp-settings/scryp-settings";
import {ScrypOffersPage} from "../scryp-offers/scryp-offers";
import {ScrypMenuPage} from "../scryp-menu/scryp-menu";
import { VolunteerWorkService } from '../../service/volunteer-work.service';
import * as L from 'leaflet';
import '../../../node_modules/leaflet-plugins/layer/tile/Bing.js';
import { Web3Service } from '../../service/web3.service';

/**
 * Generated class for the ScrypVolunteerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-scryp-volunteer',
  templateUrl: 'scryp-volunteer.html',
})
export class ScrypVolunteerPage {
  map: any;
  BING_KEY = 'At2CX0GyCF3uTS87fnCP_ueLztJa_FruD4mq9iS4peRAb5eVNWOrxyIz7p3kZJtC';
  volunteers: any;
  walletBalance: any;
  public volunteerIcon: any = new L.icon({
    iconUrl: 'assets/imgs/scryp-images/volunteer_marker.png',
    iconAnchor: [10, 10]
  });
  constructor(public navCtrl: NavController, public navParams: NavParams, private volunteerService: VolunteerWorkService, private loadingCtrl: LoadingController,
    private web3Service: Web3Service) {
  }

  async ionViewDidLoad() {
    await this.loadMaps();
  }

  async loadMaps() {
    // const coords = await this.geolocation.getCurrentPosition();
    const center = new L.LatLng(44.9711564, -93.2452265);
    this.map = new L.Map('volunteer-map', { zoomControl: false, center: center, zoom: 14 });
    const bingLayer = new L.BingLayer(this.BING_KEY, { type: "Road", maxZoom: 22, maxNativeZoom: 19 });
    this.map.addLayer(bingLayer);
    await this.getVolunteerData();
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

  goToOffers() {
    this.navCtrl.setRoot(ScrypOffersPage);
  }

  goToVolunteerLocation(volunteerSite) {
    this.navCtrl.push(ScrypVolunteerLocationPage, {
      pageObject: this,
      callback: this.mapCallback,
      volunteerSite: volunteerSite
    });
  }

  async filterItems(event) {
    if (!event.data) {
      this.volunteers = await this.volunteerService.GetVolunteerData();
    }
    this.volunteers = this.volunteers.filter(item => {
      return item.title.toLowerCase().includes(event.target.value.toLowerCase());
    })
  }

  async getVolunteerData() {
    this.volunteers = await this.volunteerService.GetVolunteerData();
    this.volunteers.forEach(v => {
      var marker = new L.Marker(new L.LatLng(v.location.latitude, v.location.longitude), { icon: this.volunteerIcon, alt: v.id });
      marker.options.alt = v.id;
      this.map.addLayer(marker);
      marker.on('click', (e) => { this.goToVolunteerLocation(v) });
    });
  }

  mapCallback(mapPageObject) {
    return new Promise(async (resolve, reject) => {
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

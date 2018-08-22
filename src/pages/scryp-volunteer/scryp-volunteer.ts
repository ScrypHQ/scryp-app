import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ScrypStorePage} from "../scryp-store/scryp-store";
import {ScrypVolunteerLocationPage} from "../scryp-volunteer-location/scryp-volunteer-location";
import {ScrypSettingsPage} from "../scryp-settings/scryp-settings";
import {ScrypOffersPage} from "../scryp-offers/scryp-offers";
import {ScrypMenuPage} from "../scryp-menu/scryp-menu";
import { VolunteerWorkService } from '../../service/volunteer-work.service';
import * as L from 'leaflet';
import '../../../node_modules/leaflet-plugins/layer/tile/Bing.js';

/**
 * Generated class for the ScrypVolunteerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scryp-volunteer',
  templateUrl: 'scryp-volunteer.html',
})
export class ScrypVolunteerPage {
  map: any;
  BING_KEY = 'At2CX0GyCF3uTS87fnCP_ueLztJa_FruD4mq9iS4peRAb5eVNWOrxyIz7p3kZJtC';
  public volunteerIcon: any = new L.icon({
    iconUrl: 'assets/imgs/scryp-images/volunteer_marker.png',
    iconAnchor: [10, 10]
  });
  constructor(public navCtrl: NavController, public navParams: NavParams, private volunteerService: VolunteerWorkService) {
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
    this.getVolunteerData();
  }

  goToMenu() {
    this.resetMaps();
    this.navCtrl.setRoot(ScrypMenuPage)
  }

  goToSettings() {
    this.resetMaps();
    this.navCtrl.setRoot(ScrypSettingsPage)
  }

  goToOffers() {
    this.resetMaps();
    this.navCtrl.setRoot(ScrypOffersPage)
  }

  goToVolunteerLocation() {
    this.resetMaps();
    this.navCtrl.setRoot(ScrypVolunteerLocationPage)
  }

  goToStore() {
    this.resetMaps();
    this.navCtrl.setRoot(ScrypStorePage)
  }

  filterItems(event) {
    console.log(event)
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

  resetMaps() {
    document.getElementById('volunteer-map').innerHTML = "<div id='volunteer-map' style='width:100%; height:50%;'></div>";
  }
}

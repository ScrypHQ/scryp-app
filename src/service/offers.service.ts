import { Injectable } from "../../node_modules/@angular/core";

@Injectable()
export class OffersService {
  OffersData = [
    {
      "id": 1,
      "title": "Scryp high-five watt offer",
      "validity": "2018-12-31T00:00:00",
      "offeredBy": "Five Watt Coffee",
      "description": "This specialty coffee is available between the dates Sep 1 - Dec 31, 2018",
      "location": {
        "latitude": 44.9344655,
        "longitude": -93.2799638
      },
      "address": "Minneapolis",
      "regularPrice": 5,
      "reducedPrice": 2.75,
      "scrypPrice": 2.25
    },
    {
      "id": 2,
      "title": "Enjoy Discount at Cossetta with Scryp",
      "validity": "2018-09-06T17:53:41.4053872+05:30",
      "offeredBy": "Cossetta",
      "description": "Part of an Italian food complex, this cafeteria-style setup serves classic pastas, hot subs & pizza.",
      "location": {
        "latitude": 44.9547877,
        "longitude": -93.1011418
      },
      "address": "St. Paul",
      "regularPrice": 71.99,
      "reducedPrice": 51.99,
      "scrypPrice": 20
    },
    {
      "id": 3,
      "title": "Go Scrping at Black Sheep Coal Fired Pizza",
      "validity": "2018-08-19T17:53:41.4053872+05:30",
      "offeredBy": "Black Sheep Coal Fired Pizza",
      "description": "Casual pizzeria turning out coal-fired, thin-crust specialty pies, with craft beers on tap & wine.",
      "location": {
        "latitude": 44.9547877,
        "longitude": -93.1011418
      },
      "address": "St. Paul",
      "regularPrice": 17.99,
      "reducedPrice": 15.99,
      "scrypPrice": 2
    },
    {
      "id": 4,
      "title": "Spend Scryp at Spoon and Stable",
      "validity": "2018-08-19T17:53:41.4053872+05:30",
      "offeredBy": "Spoon and Stable",
      "description": "Hip pick for a French-inspired menu in a cozy, rustic-chic vintage carriage house.",
      "location": {
        "latitude": 44.9711564,
        "longitude": -93.2452265
      },
      "address": "Minneapolis",
      "regularPrice": 100.99,
      "reducedPrice": 80.99,
      "scrypPrice": 20
    }
  ];

  GetOffersData() {
    return this.OffersData;
  }
}
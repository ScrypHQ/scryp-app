import { Injectable } from "../../node_modules/@angular/core";

@Injectable()
export class VolunteerWorkService {
  VolunteeringData = [
    {
      "id": 1,
      "title": "Support the kids",
      "startDate": "2018-08-22T17:52:55.2424912+05:30",
      "organizedBy": "Children's Home Society Family",
      "description": "Support the kids and earn scryp. These kids need your help and support",
      "location": {
        "latitude": 44.9684217,
        "longitude": -93.2155939
      },
      "address": "Minneapolis",
      "scryptHourRate": 9.25
    },
    {
      "id": 2,
      "title": "Work at Old Age Center",
      "startDate": "2018-08-17T17:52:55.2424912+05:30",
      "organizedBy": "The Salvation Army",
      "description": "Support the these people and earn scryp. These people need your love and support",
      "location": {
        "latitude": 44.9683789,
        "longitude": -93.2159374
      },
      "address": "St. Paul",
      "scryptHourRate": 8.25
    },
    {
      "id": 3,
      "title": "Help needed for restoring Wabun Picnic Area",
      "startDate": "2018-09-01T17:52:55.2424912+05:30",
      "organizedBy": "Wabun Picnic Area Group",
      "description": "Help us in cleaning the park and earn scryp.",
      "location": {
        "latitude": 44.9157724,
        "longitude": -93.2074045
      },
      "address": "Minneapolis",
      "scryptHourRate": 10.5
    },
    {
      "id": 4,
      "title": "Blood Donation Camp",
      "startDate": "2018-10-06T17:52:55.2424912+05:30",
      "organizedBy": "Red Cross Society",
      "description": "A lot many lives can be saved if you donate some blood. Save lives & earn scryp",
      "location": {
        "latitude": 44.9481579,
        "longitude": -93.1023435
      },
      "address": "St. Joseph's Hospital, St.Paul",
      "scryptHourRate": 5
    }
  ];

  GetVolunteerData() {
    return this.VolunteeringData;
  }
}
import {Injectable} from '@angular/core';
import {Observable}from 'rxjs/Observable';
import {Http,Response}from '@angular/http';
import 'rxjs/Rx';
import {InfoWindow}from './InfoWindow';
import {Coordinates}from './coordinate';
import myGlobals = require('./constants');

@Injectable()
export class LocationService {

  constructor(private http: Http) {}

  getCurrentLocation(): Observable < any > {
    return this.http.get('http://ipinfo.io/json')
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log(res);
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  getGolfResorts(): Observable < any > {
    return this.http.get(myGlobals.GOLFCOURSE_URL)
      .map(this.MapToCoordinates)
      .catch(this.handleError);
  }
    getSkiResorts(): Observable < any > {
    return this.http.get(myGlobals.SKICOURSE_URL)
      .map(this.MapToCoordinates)
      .catch(this.handleError);
  }


  public aggreateCoordinates(coordinatesToBeMapped: Array < Coordinates > ) {
   var coordinatesList: Array < Coordinates > = new Array < Coordinates > ();
    var city = {};
    var country = {};
    coordinatesToBeMapped.map(function(a) {
      let countryName = a.country;
      let cityName = a.city;
      let lat = Number(a.lat);
      let lng = Number(a.lng);
      if (countryName in country) {
        let coor = country[countryName];
        let count = Number(coor.count);
        count++;
        coor.count = String(count);
        country["infoWindow"]=null;

      } else {
        var coor = {};
        coor["lat"] = Number(lat);
        coor["lng"] = Number(lng);
        coor["zoomMax"] = 4;
        coor["zoomMin"] = 0;
        coor["count"] = "1";
        coor["country"] = countryName;
        coor["city"] = "";
        coor["type"] = "Golf";
        country["infoWindow"]=a.infoWindow;
        country[countryName] = coor;
        
      }

      if (cityName in city) {
        let cityCoor = city[cityName];
        let count = Number(coor["count"]);
        count++;
        coor["count"] = String(count);
        coor["infoWindow"]=null;
      } else {
        var cityCoor = {};
        cityCoor["lat"] = Number(lat);
        cityCoor["lng"] = Number(lng);
        cityCoor["zoomMax"] = 8;
        cityCoor["zoomMin"] = 5;
        cityCoor["count"] = "1";
        cityCoor["country"] = countryName;
        cityCoor["city"] = cityName;
        cityCoor["type"] = "Golf";
        city["infoWindow"]=a.infoWindow;
        city[cityName] = cityCoor;
        
      }
      for (let country_id in country) {
        let coorCountry = country[country_id];
        coordinatesList.push(new Coordinates(coorCountry["lat"], coorCountry["lng"], coorCountry["zoomMin"], coorCountry["zoomMax"], coorCountry["count"], coorCountry["country"], coorCountry["city"], coorCountry["type"], coorCountry["infoWindow"]));
      }
      for (let city_id in city) {
        let coor = city[city_id];
        coordinatesList.push(new Coordinates(coor["lat"], coor["lng"], coor["zoomMin"], coor["zoomMax"], coor["count"], coor["country"], coor["city"], coor["type"], coor["infoWindow"]));
      }
      coordinatesList.push(a);
    });
    return coordinatesList;
  }


  private MapToCoordinates(res: Response) { 
  let body = res.json();
    let resorts: any[] = body.resorts;
    var country = {};
    var city = {};
    let icon= "../img/icon_golf.png";
    var coordinatesList: Array < Coordinates > = new Array < Coordinates > ();
   console.log(resorts)
    resorts.map(function(a) {
       
      let country_id = a.country_id;
      let city_id = a.city_id;
      let lat = Number(a.latitude);
      let lng = Number(a.longitude);
      let countryName = a.country.name;
      let cityName = a.city.name;
      let address: string = a.street + "," + a.zip + "," + cityName + "," + countryName;
      let infoWindow: InfoWindow = new InfoWindow(a.phone, address, a.description, " ", true, a.name, a.thumbnail,false,"");
      let coordinates: Coordinates = new Coordinates(lat, lng, 9, 20, "1", countryName, cityName,"", infoWindow,icon);
      if (country_id in country) {  
        let coor = country[country_id];
        let count = Number(coor["count"]);
        count++;
        coor["count"] = String(count);
        coor["infoWindow"]=null;

      } else {
        var coor = {};
        coor["lat"] = Number(lat);
        coor["lng"] = Number(lng);
        coor["zoomMax"] = 4;
        coor["zoomMin"] = 0;
        coor["count"] = "1";
        coor["country"] = countryName;
        coor["city"] = "";
        coor["type"] = "Golf";
        coor["infoWindow"]=infoWindow;
        country[country_id] = coor;
       
      }

      if (city_id in city) {
        let cityCoor = city[city_id];
        let count = Number(coor["count"]);
        count++;
        coor["count"] = String(count);
        coor["infoWindow"]=null;
      } else {
        var cityCoor = {};
        cityCoor["lat"] = Number(lat);
        cityCoor["lng"] = Number(lng);
        cityCoor["zoomMax"] = 8;
        cityCoor["zoomMin"] = 5;
        cityCoor["count"] = "1";
        cityCoor["country"] = countryName;
        cityCoor["city"] = cityName;
        cityCoor["type"] = "Golf"; 
        cityCoor["infoWindow"]=infoWindow;
        city[city_id] = cityCoor;
      }
      
      coordinatesList.push(coordinates);
    });
    console.log(country);
    console.log(city);
    for (let country_id in country) {
      var coor = country[country_id];
      coordinatesList.push(new Coordinates(coor["lat"], coor["lng"], coor["zoomMin"], coor["zoomMax"], coor["count"], coor["country"], coor["city"], coor["type"], coor["infoWindow"],""));
    }
    for (let city_id in city) {
      var coor = city[city_id];
      coordinatesList.push(new Coordinates(coor["lat"], coor["lng"], coor["zoomMin"], coor["zoomMax"], coor["count"], coor["country"], coor["city"], coor["type"], coor["infoWindow"],""));
    }
    console.log(coordinatesList);
    return coordinatesList;
   }

   split(location: any, splitIndex: number) {
        let splits = location.loc.split(',');

        if (splits!=null&&splits.length > 1) {
            if (splits.length > splitIndex && splitIndex >= 0) {
                console.log(splits[splitIndex]);
                return Number(splits[splitIndex]);
            }
            return Number(splits[splits.length - 1]);
        } else {
            return 0.0;
        }
    }

}
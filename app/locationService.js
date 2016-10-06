"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var InfoWindow_1 = require('./InfoWindow');
var Coordinates_1 = require('./Coordinates');
var myGlobals = require('./constants');
var LocationService = (function () {
    function LocationService(http) {
        this.http = http;
    }
    LocationService.prototype.getCurrentLocation = function () {
        console.log("may be in current");
        return this.http.get('http://ipinfo.io/json')
            .map(this.extractData)
            .catch(this.handleError);
    };
    LocationService.prototype.extractData = function (res) {
        console.log(res);
        var body = res.json();
        return body || {};
    };
    LocationService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    LocationService.prototype.getGolfResorts = function () {
        console.log("may be in getGolfResorts");
        return this.http.get(myGlobals.GOLFCOURSE_URL)
            .map(this.MapToCoordinates)
            .catch(this.handleError);
    };
    LocationService.prototype.getSkiResorts = function () {
        console.log("may be in getSkiResorts");
        return this.http.get(myGlobals.SKICOURSE_URL)
            .map(this.MapToCoordinates)
            .catch(this.handleError);
    };
    LocationService.prototype.aggreateCoordinates = function (coordinatesToBeMapped) {
        var coordinatesList = new Array();
        var city = {};
        var country = {};
        coordinatesToBeMapped.map(function (a) {
            var countryName = a.country;
            var cityName = a.city;
            var lat = Number(a.lat);
            var lng = Number(a.lng);
            if (countryName in country) {
                var coor_1 = country[countryName];
                var count = Number(coor_1.count);
                count++;
                coor_1.count = String(count);
                country["infoWindow"] = null;
            }
            else {
                var coor = {};
                coor["lat"] = Number(lat);
                coor["lng"] = Number(lng);
                coor["zoomMax"] = 4;
                coor["zoomMin"] = 0;
                coor["count"] = "1";
                coor["country"] = countryName;
                coor["city"] = "";
                coor["type"] = "Golf";
                country["infoWindow"] = a.infoWindow;
                country[countryName] = coor;
            }
            if (cityName in city) {
                var cityCoor_1 = city[cityName];
                var count = Number(coor["count"]);
                count++;
                coor["count"] = String(count);
                coor["infoWindow"] = null;
            }
            else {
                var cityCoor = {};
                cityCoor["lat"] = Number(lat);
                cityCoor["lng"] = Number(lng);
                cityCoor["zoomMax"] = 8;
                cityCoor["zoomMin"] = 5;
                cityCoor["count"] = "1";
                cityCoor["country"] = countryName;
                cityCoor["city"] = cityName;
                cityCoor["type"] = "Golf";
                city["infoWindow"] = a.infoWindow;
                city[cityName] = cityCoor;
            }
            for (var country_id in country) {
                var coorCountry = country[country_id];
                coordinatesList.push(new Coordinates_1.Coordinates(coorCountry["lat"], coorCountry["lng"], coorCountry["zoomMin"], coorCountry["zoomMax"], coorCountry["count"], coorCountry["country"], coorCountry["city"], coorCountry["type"], coorCountry["infoWindow"]));
            }
            for (var city_id in city) {
                var coor_2 = city[city_id];
                coordinatesList.push(new Coordinates_1.Coordinates(coor_2["lat"], coor_2["lng"], coor_2["zoomMin"], coor_2["zoomMax"], coor_2["count"], coor_2["country"], coor_2["city"], coor_2["type"], coor_2["infoWindow"]));
            }
            coordinatesList.push(a);
        });
        return coordinatesList;
    };
    LocationService.prototype.MapToCoordinates = function (res) {
        var body = res.json();
        var resorts = body.resorts;
        var country = {};
        var city = {};
        var icon = "../img/icon_golf.png";
        var coordinatesList = new Array();
        console.log(resorts);
        resorts.map(function (a) {
            var country_id = a.country_id;
            var city_id = a.city_id;
            var lat = Number(a.latitude);
            var lng = Number(a.longitude);
            var countryName = a.country.name;
            var cityName = a.city.name;
            var address = a.street + "," + a.zip + "," + cityName + "," + countryName;
            var infoWindow = new InfoWindow_1.InfoWindow(a.phone, address, a.description, " ", true, a.name, a.thumbnail, false, "");
            var coordinates = new Coordinates_1.Coordinates(lat, lng, 9, 20, "1", countryName, cityName, "", infoWindow, icon);
            if (country_id in country) {
                var coor_3 = country[country_id];
                var count = Number(coor_3["count"]);
                count++;
                coor_3["count"] = String(count);
                coor_3["infoWindow"] = null;
            }
            else {
                var coor = {};
                coor["lat"] = Number(lat);
                coor["lng"] = Number(lng);
                coor["zoomMax"] = 4;
                coor["zoomMin"] = 0;
                coor["count"] = "1";
                coor["country"] = countryName;
                coor["city"] = "";
                coor["type"] = "Golf";
                coor["infoWindow"] = infoWindow;
                country[country_id] = coor;
            }
            if (city_id in city) {
                var cityCoor_2 = city[city_id];
                var count = Number(coor["count"]);
                count++;
                coor["count"] = String(count);
                coor["infoWindow"] = null;
            }
            else {
                var cityCoor = {};
                cityCoor["lat"] = Number(lat);
                cityCoor["lng"] = Number(lng);
                cityCoor["zoomMax"] = 8;
                cityCoor["zoomMin"] = 5;
                cityCoor["count"] = "1";
                cityCoor["country"] = countryName;
                cityCoor["city"] = cityName;
                cityCoor["type"] = "Golf";
                cityCoor["infoWindow"] = infoWindow;
                city[city_id] = cityCoor;
            }
            coordinatesList.push(coordinates);
        });
        console.log(country);
        console.log(city);
        for (var country_id in country) {
            var coor = country[country_id];
            coordinatesList.push(new Coordinates_1.Coordinates(coor["lat"], coor["lng"], coor["zoomMin"], coor["zoomMax"], coor["count"], coor["country"], coor["city"], coor["type"], coor["infoWindow"], ""));
        }
        for (var city_id in city) {
            var coor = city[city_id];
            coordinatesList.push(new Coordinates_1.Coordinates(coor["lat"], coor["lng"], coor["zoomMin"], coor["zoomMax"], coor["count"], coor["country"], coor["city"], coor["type"], coor["infoWindow"], ""));
        }
        console.log(coordinatesList);
        return coordinatesList;
    };
    LocationService.prototype.split = function (location, splitIndex) {
        var splits = location.loc.split(',');
        if (splits != null && splits.length > 1) {
            if (splits.length > splitIndex && splitIndex >= 0) {
                console.log(splits[splitIndex]);
                return Number(splits[splitIndex]);
            }
            return Number(splits[splits.length - 1]);
        }
        else {
            return 0.0;
        }
    };
    LocationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LocationService);
    return LocationService;
}());
exports.LocationService = LocationService;
//# sourceMappingURL=LocationService.js.map
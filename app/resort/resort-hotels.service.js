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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var hotelService = (function () {
    function hotelService(http) {
        this.http = http;
        this.hotelsApi = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C&location=BOS&check_in=2017-03-14&check_out=2017-03-16&amenity=RESTAURANT&amenity=PARKING&number_of_results=2";
        // private this.base_url = "https://www.omdbapi.com/?t=%22Silicon%20Valley%22&Season=1"
        this.base_url = "../Hotels.json";
    }
    //v1.2/hotels/search-circle?apikey=log%20in%20to%20retrieve%20API%20key&latitude=36.0857&longitude=-115.1541&radius=42&check_in=2016-11-15&check_out=2016-11-16
    //http://api.sandbox.amadeus.com/v1.2/hotels/search-circle?latitude=43.6&longitude=7.2&radius=50&check_in=2015-09-01&check_out=2015-09-03&chain=RT¤cy=EUR&number_of_results=50&apikey=<your API key>
    hotelService.prototype.getHotels1 = function () {
        return this.http.get(this.hotelsApi)
            .map(this.extractData1)
            .catch(this.handleError);
    };
    hotelService.prototype.onSearch = function (latitude, longitude, radius, checkIn_date, checkOut_date, currency, noOfResults) {
        "https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C&latitude=13.01225&longitude=53.339772&radius=2042&check_in=2016-11-25&check_out=2016-11-30";
        var httpRequest = "http://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C";
        httpRequest += "&latitude=" + latitude + "&longitude=" + longitude + "&radius=2042&check_in=" + this.convertToISOFormatter(checkIn_date);
        if (checkOut_date != null) {
            httpRequest += "&check_out=" + this.convertToISOFormatter(checkOut_date);
        }
        /*
             if(adults>0){
                httpRequest+="&adults="+adults;
               }
                if(children>0){
                    httpRequest+="&children="+children;
                }
                if(infants>0){
                    httpRequest+="&infants="+infants;
                }
                if(selectClass!=null ||selectClass!=" "){
                    httpRequest+="&travel_class="+selectClass;
                }
                */
        console.log("httpRequestUrl:" + httpRequest);
        return this.http.get(httpRequest)
            .map(this.extractData1)
            .catch(this.handleError);
        //  return this.http.get(httpRequest).map((res: Response) => res.json()).catch(this.handleError);
    };
    hotelService.prototype.findAirport = function (latitude, longitude) {
        var httpRequest = "https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C&latitude=" + latitude + "&longitude=" + longitude;
        return this.http.get(httpRequest).map(function (res) { return res.json(); });
    };
    hotelService.prototype.extractData1 = function (res) {
        var body = res.json();
        console.log(body);
        return body["results"] || {};
    };
    hotelService.prototype.showSuggestions = function (search) {
        var httpRequest = "https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C&term=" + search;
        return this.http.get(httpRequest).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    hotelService.prototype.convertToISOFormatter = function (date) {
        if (date == null)
            return null;
        var month;
        var day;
        if (date.getMonth() < 9) {
            month = "0" + (date.getMonth() + 1);
        }
        else
            month = String(date.getMonth() + 1);
        if (date.getDate() < 9) {
            day = "0" + (date.getDate());
        }
        else
            day = String(date.getDate());
        return date.getFullYear() + "-" + month + "-" + day;
    };
    hotelService.prototype.getHotels = function () {
        return this.http.get(this.base_url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    hotelService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(body);
        return body["hotels"] || {};
    };
    hotelService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error("Error:" + errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    hotelService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], hotelService);
    return hotelService;
}());
exports.hotelService = hotelService;
//# sourceMappingURL=resort-hotels.service.js.map
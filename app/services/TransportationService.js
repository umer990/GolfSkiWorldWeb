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
var TransportationService = (function () {
    function TransportationService(http) {
        this.http = http;
    }
    TransportationService.prototype.findAirport = function (latitude, longitude) {
        var httpRequest = "https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C&latitude=" + latitude + "&longitude=" + longitude;
        return this.http.get(httpRequest).map(function (res) { return res.json(); });
    };
    TransportationService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    TransportationService.prototype.showSuggestions = function (search) {
        var httpRequest = "https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C&term=" + search;
        return this.http.get(httpRequest).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    TransportationService.prototype.convertToISOFormatter = function (date) {
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
    TransportationService.prototype.onSearch = function (origin, destination, departure_date, return_date, selectClass, adults, children, infants, currency) {
        var httpRequest = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=9eQbcHpLQr0sXaQ5pGGOOFAvMxFBn05C";
        httpRequest += "&origin=" + origin + "&destination=" + destination + "&departure_date=" + this.convertToISOFormatter(departure_date);
        if (return_date != null) {
            httpRequest += "&return_date=" + this.convertToISOFormatter(return_date);
        }
        if (adults > 0) {
            httpRequest += "&adults=" + adults;
        }
        if (children > 0) {
            httpRequest += "&children=" + children;
        }
        if (infants > 0) {
            httpRequest += "&infants=" + infants;
        }
        if (selectClass != null || selectClass != " ") {
            httpRequest += "&travel_class=" + selectClass;
        }
        return this.http.get(httpRequest).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    TransportationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TransportationService);
    return TransportationService;
}());
exports.TransportationService = TransportationService;
//# sourceMappingURL=TransportationService.js.map
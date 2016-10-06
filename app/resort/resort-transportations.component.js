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
var router_1 = require('@angular/router');
var LocationService_1 = require('../services/LocationService');
var resort_transportations_service_1 = require('./resort-transportations.service');
var TransportationsComponent = (function () {
    function TransportationsComponent(route, router, geoService, flightService1) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.geoService = geoService;
        this.flightService1 = flightService1;
        this.selectValue = "Oneway";
        this.selectClass = "ECONOMY";
        this.currency = "USD";
        this.flights = [];
        this.showDepartureAirportSuggestion = false;
        this.showDestinationAirportSuggestion = false;
        this.showDepartureTimePicker = false;
        this.showReturnTimePicker = false;
        this.showReturnDate = false;
        this.valid = false;
        this.errorMessage = null;
        this.minDate = new Date();
        this.departure_date = this.minDate;
        flightService1.getHotels()
            .subscribe(function (data) { return _this.flights = data["Itineraries"]; }),
            function (error) { return alert(error); },
            function () { return console.log("Date get finished"); };
    }
    TransportationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.destLat = params['lat'];
            _this.destLng = params['lng'];
            _this.getCurrentLocation();
        });
    };
    TransportationsComponent.prototype.getCurrentLocation = function () {
        var _this = this;
        this.geoService.getCurrentLocation()
            .subscribe(function (location) {
            _this.baseLat = _this.geoService.split(location, 0);
            _this.baseLng = _this.geoService.split(location, 1);
        }, function (error) { return _this.errorMessage = error; });
    };
    //TODO : fillin departureSuggestions
    TransportationsComponent.prototype.searchDepartureAirportSuggestions = function () {
        console.log("showDepartureAirportSuggestion" + this.showDepartureAirportSuggestion);
        if (this.origin != null && this.origin != "") {
            this.showDepartureAirportSuggestion = true;
        }
        else {
        }
    };
    //TODO : fillin destinationSuggestions
    TransportationsComponent.prototype.searchDestinationAirportSuggestions = function () {
        if (this.destination != null && this.destination != "") {
            this.showDestinationAirportSuggestion = true;
        }
        else {
        }
    };
    // TODO : autoComplete instead of this bug version
    TransportationsComponent.prototype.clickStartDate = function (event) {
        console.log("event:" + event);
        this.departure_date = event;
        console.log("depart:" + this.departure_date);
        this.showDepartureTimePicker = false;
    };
    TransportationsComponent.prototype.onFocusStartDate = function () {
        this.showDepartureTimePicker = !this.showDepartureTimePicker;
    };
    TransportationsComponent.prototype.clickReturnDate = function (event) {
        this.return_date = event;
        this.showReturnTimePicker = false;
    };
    TransportationsComponent.prototype.onFocusReturnDate = function () {
        this.showReturnTimePicker = !this.showReturnTimePicker;
    };
    TransportationsComponent.prototype.clickDepartureAirport = function (item) {
        console.log(item);
        this.origin = item;
        this.showDepartureAirportSuggestion = false;
    };
    TransportationsComponent.prototype.onFocusDepartureAirport = function () {
        this.showDepartureAirportSuggestion = !this.showDepartureAirportSuggestion;
        console.log("onFocusDepartureAirport" + this.showDepartureAirportSuggestion);
    };
    TransportationsComponent.prototype.clickDestinationAirport = function (item) {
        console.log(item);
        this.destination = item;
        this.showDestinationAirportSuggestion = false;
    };
    TransportationsComponent.prototype.onFocusDestinationAirport = function () {
        this.showDestinationAirportSuggestion = !this.showDestinationAirportSuggestion;
    };
    // when  user choose roundTrip the returnDate input should be shown
    TransportationsComponent.prototype.changeTrip = function (value) {
        this.selectValue = value;
        console.log(this.showReturnDate);
        if (this.selectValue != "Oneway")
            this.showReturnDate = true;
        else
            this.showReturnDate = false;
        if (this.showReturnDate) {
            var date = new Date();
            date.setDate(date.getDate() + 3);
            this.return_date = date;
        }
        else {
            this.return_date = null;
        }
    };
    TransportationsComponent.prototype.changeClass = function (value) {
        this.selectClass = value;
    };
    TransportationsComponent.prototype.changeCurrency = function (value) {
        this.currency = value;
    };
    //TODO: return a list of flightsInfo according to the query cirtiria
    TransportationsComponent.prototype.onSerach = function () {
    };
    TransportationsComponent = __decorate([
        core_1.Component({
            selector: 'trans',
            templateUrl: 'app/resort/resort-transportations.component.html',
            providers: [LocationService_1.LocationService, resort_transportations_service_1.transportservice],
            styleUrls: ['app/resort/resort-transportations.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, LocationService_1.LocationService, resort_transportations_service_1.transportservice])
    ], TransportationsComponent);
    return TransportationsComponent;
}());
exports.TransportationsComponent = TransportationsComponent;
//# sourceMappingURL=resort-transportations.component.js.map
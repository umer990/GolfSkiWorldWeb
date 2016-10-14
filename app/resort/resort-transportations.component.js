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
var TransportationService_1 = require('../services/TransportationService');
var Airport_1 = require('./Airport');
var LowFareSearch_1 = require('./LowFareSearch');
var FlightCheckoutService_1 = require('../services/FlightCheckoutService');
var TransportationsComponent = (function () {
    function TransportationsComponent(route, router, _eref, service, flightCheckoutService) {
        this.route = route;
        this.router = router;
        this.service = service;
        this.flightCheckoutService = flightCheckoutService;
        this.valid = false;
        this.showDepartureAirportSuggestion = false;
        this.showDestinationAirportSuggestion = false;
        this.showDepartureTimePicker = false;
        this.showReturnTimePicker = false;
        this.showReturnDate = false;
        this.errorMessage = null;
        this.adults = 1;
        this.children = 0;
        this.infants = 0;
        this.departAirport = new Airport_1.AirportInfo();
        this.departure_date = new Date();
        this.arrivalAirport = new Airport_1.AirportInfo();
        this.selectValue = "Oneway";
        this.selectClass = "ECONOMY";
        this.currency = "USD";
        this.minDate = this.departure_date;
    }
    TransportationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.destLat = params['lat'];
            _this.destLng = params['lng'];
        });
        this.getCurrentService();
    };
    TransportationsComponent.prototype.getCurrentService = function () {
        var _this = this;
        if (window.navigator && window.navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) { _this.userLat = pos.coords.latitude, _this.userLng = pos.coords.longitude; _this.findUserAirport(); console.log("ipInfo" + _this.userLat + _this.userLng); });
        }
        else {
            this.userLat = 0.0;
            this.userLng = 0.0;
            this.findUserAirport();
        }
        ;
        /* this.getCurrentLocationService= this.geoservice.getCurrentLocation().subscribe(location => {
              this.userLat = this.split(location, 0);
              this.userLng = this.split(location, 1);
           this.findUserAirportService=  this.service.findAirport(this.userLat, this.userLng).subscribe(location => {
                  console.log("user airport");
                  console.log(location);
                  this.departAirportList = location;
                  if (this.departAirportList != null) {
                      this.departAirport.value = this.departAirportList[0].airport;
                       this.departAirport.label=this.departAirportList[0].airport_name;
                      this.departSearch=this.departAirport.value;
                  }
              }, error => this.errorMessage = error);
          }, error => this.errorMessage = error);*/
        this.findDestAirportService = this.service.findAirport(this.destLat, this.destLng).subscribe(function (location) {
            console.log("dest airport");
            console.log(location);
            _this.arrivalAirportList = location;
            if (_this.arrivalAirportList != null) {
                _this.arrivalAirport.value = _this.arrivalAirportList[0].airport;
                _this.arrivalAirport.label = _this.arrivalAirportList[0].airport_name;
                _this.arrivalSearch = _this.arrivalAirport.value;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    TransportationsComponent.prototype.onSearch = function () {
        var _this = this;
        this.searchService = this.service.onSearch(this.departAirport.value, this.arrivalAirport.value, this.departure_date, this.return_date, this.selectClass, this.adults, this.children, this.infants, this.currency).subscribe(function (data) { _this.result = _this.convertLowFareSearch(data); console.log(_this.result); }, function (error) { return _this.errorMessage = error; });
    };
    TransportationsComponent.prototype.findUserAirport = function () {
        var _this = this;
        this.findUserAirportService = this.service.findAirport(this.userLat, this.userLng).subscribe(function (location) {
            console.log("user airport");
            console.log(location);
            _this.departAirportList = location;
            if (_this.departAirportList != null) {
                _this.departAirport.value = _this.departAirportList[0].airport;
                _this.departAirport.label = _this.departAirportList[0].airport_name;
                _this.departSearch = _this.departAirport.value;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    TransportationsComponent.prototype.searchDepartureAirportSuggestions = function () {
        var _this = this;
        console.log("showDepartureAirportSuggestion" + this.showDepartureAirportSuggestion);
        if (this.departSearch != null && this.departSearch != "") {
            this.showDepartureAirportSuggestion = true;
            this.showSuggestionsService = this.service.showSuggestions(this.departSearch).subscribe(function (location) {
                _this.departureSuggestions = location;
                console.log(location);
            }, function (error) { return _this.errorMessage = error; });
        }
        else {
            this.departureSuggestions = null;
        }
    };
    TransportationsComponent.prototype.searchDestinationAirportSuggestions = function () {
        var _this = this;
        console.log("showDestinatoinSuggestions");
        if (this.arrivalSearch != null && this.arrivalSearch != "") {
            this.showDestinationAirportSuggestion = true;
            this.showDestSuggestionsService = this.service.showSuggestions(this.arrivalSearch).subscribe(function (location) {
                _this.destinationSuggestions = location;
                console.log(location);
            }, function (error) { return _this.errorMessage = error; });
        }
        else {
            this.destinationSuggestions = null;
        }
    };
    TransportationsComponent.prototype.clickStartDate = function (event) {
        console.log("event:" + event);
        this.departure_date = event;
        if (this.showReturnDate) {
            var date = new Date();
            date.setDate(this.departure_date.getDate() + 3);
            this.return_date = date;
        }
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
        this.departSearch = item.value;
        this.departAirport = item;
        this.showDepartureAirportSuggestion = false;
    };
    TransportationsComponent.prototype.onFocusDepartureAirport = function () {
        this.showDepartureAirportSuggestion = !this.showDepartureAirportSuggestion;
        console.log("onFocusDepartureAirport" + this.showDepartureAirportSuggestion);
    };
    TransportationsComponent.prototype.clickDestinationAirport = function (item) {
        console.log(item);
        this.arrivalSearch = item.value;
        this.arrivalAirport = item;
        this.showDestinationAirportSuggestion = false;
    };
    TransportationsComponent.prototype.onFocusDestinationAirport = function () {
        this.showDestinationAirportSuggestion = !this.showDestinationAirportSuggestion;
    };
    TransportationsComponent.prototype.changeTrip = function (value) {
        this.selectValue = value;
        console.log(this.showReturnDate);
        if (this.selectValue != "Oneway")
            this.showReturnDate = true;
        else
            this.showReturnDate = false;
        if (this.showReturnDate) {
            var date = new Date();
            date.setDate(this.departure_date.getDate() + 3);
            this.return_date = date;
        }
        else {
            this.return_date = null;
        }
    };
    TransportationsComponent.prototype.changeClass = function (value) {
        this.selectClass = value;
        //this.query.travel_class = this.selectClass;
    };
    TransportationsComponent.prototype.onClick = function (event) {
        this.showDepartureAirportSuggestion = false;
        this.showDestinationAirportSuggestion = false;
        this.showDepartureTimePicker = false;
        this.showReturnTimePicker = false;
        if (this.departDateBox != null && this.departDateBox.nativeElement != null && this.departDateBox.nativeElement.contains(event.target)) {
            this.showDepartureTimePicker = true;
        }
        else if (this.departDatepicker != null && this.departDatepicker.nativeElement != null && this.departDatepicker.nativeElement.contains(event.target)) {
            this.showDepartureTimePicker = true;
        }
        else if (this.returnDateBox != null && this.returnDateBox.nativeElement != null && this.returnDateBox.nativeElement.contains(event.target)) {
            this.showReturnTimePicker = true;
        }
        else if (this.returnDatepicker != null && this.returnDatepicker.nativeElement != null && this.returnDatepicker.nativeElement.contains(event.target)) {
            this.showReturnTimePicker = true;
        }
    };
    TransportationsComponent.prototype.convertLowFareSearch = function (entity) {
        this.currency = entity.currency;
        var result = new Array();
        entity.results.forEach(function (a) {
            var b = a;
            b.itineraries.forEach(function (c) {
                var item = new LowFareSearch_1.ItineraryWithPrice();
                item.fare = b.fare;
                item.total_price = b.fare.total_price;
                item.outFlights = c.outbound.flights;
                //item.inFlights=c.inbound.flights;
                item.out_marketing_airline = item.outFlights[0].marketing_airline;
                var departs_at = item.outFlights[0].departs_at;
                //item.departs_at=departs_at;
                item.out_departs_at = item.spilt(departs_at, 0);
                item.out_departs_time = item.spilt(departs_at, 1);
                var depart = new Date(item.out_departs_at);
                depart.setHours(item.spiltTime(item.out_departs_time, 0));
                depart.setMinutes(item.spiltTime(item.out_departs_time, 1));
                item.out_origin_airport = item.outFlights[0].origin.airport;
                item.out_origin_terminal = item.outFlights[0].origin.terminal;
                item.out_marketing_airline = item.outFlights[0].marketing_airline;
                item.out_flight_number = item.outFlights[0].flight_number;
                item.out_aircraft = item.outFlights[0].aircraft;
                var lastIndex = item.outFlights.length - 1;
                item.out_destination_airport = item.outFlights[lastIndex].destination.airport;
                item.out_destination_terminal = item.outFlights[lastIndex].destination.terminal;
                var arrives_at = item.outFlights[lastIndex].arrives_at;
                //item.arrives_at=arrives_at;
                item.out_arrives_at = item.spilt(arrives_at, 0);
                item.out_arrives_time = item.spilt(arrives_at, 1);
                var arrives = new Date(item.out_departs_at);
                arrives.setHours(item.spiltTime(item.out_arrives_time, 0));
                arrives.setMinutes(item.spiltTime(item.out_arrives_time, 1));
                item.out_stops = lastIndex;
                item.out_duration = item.getHoursBetween(depart, arrives);
                if (c.inbound != null) {
                    item.include_in_bound = true;
                    item.inFlights = c.inbound.flights;
                    //console.log("inflights is not null");
                    // console.log(item.inFlights);
                    item.in_marketing_airline = item.inFlights[0].marketing_airline;
                    var departs_at_1 = item.inFlights[0].departs_at;
                    //item.departs_at=departs_at;
                    item.in_departs_at = item.spilt(departs_at_1, 0);
                    item.in_departs_time = item.spilt(departs_at_1, 1);
                    var depart_1 = new Date(item.in_departs_at);
                    depart_1.setHours(item.spiltTime(item.in_departs_time, 0));
                    depart_1.setMinutes(item.spiltTime(item.in_departs_time, 1));
                    item.in_origin_airport = item.inFlights[0].origin.airport;
                    item.in_origin_terminal = item.inFlights[0].origin.terminal;
                    item.in_marketing_airline = item.inFlights[0].marketing_airline;
                    item.in_flight_number = item.inFlights[0].flight_number;
                    item.in_aircraft = item.inFlights[0].aircraft;
                    var lastIndex_1 = item.inFlights.length - 1;
                    item.in_destination_airport = item.inFlights[lastIndex_1].destination.airport;
                    item.in_destination_terminal = item.inFlights[lastIndex_1].destination.terminal;
                    var arrives_at_1 = item.inFlights[lastIndex_1].arrives_at;
                    //item.arrives_at=arrives_at;
                    item.in_arrives_at = item.spilt(arrives_at_1, 0);
                    item.in_arrives_time = item.spilt(arrives_at_1, 1);
                    var arrives_1 = new Date(item.in_departs_at);
                    arrives_1.setHours(item.spiltTime(item.in_arrives_time, 0));
                    arrives_1.setMinutes(item.spiltTime(item.in_arrives_time, 1));
                    item.in_stops = lastIndex_1;
                    item.in_duration = item.getHoursBetween(depart_1, arrives_1);
                }
                result.push(item);
            });
        });
        return result;
    };
    TransportationsComponent.prototype.onClickInfo = function (item) {
        item.showDetails = !item.showDetails;
    };
    TransportationsComponent.prototype.onSelectItineraryWithPrice = function (item) {
        this.flightCheckoutService.setItineraryInfo(item, this.adults, this.children, this.infants);
        var link = ['/checkout'];
        this.router.navigate(link);
    };
    TransportationsComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component destroyed
        if (this.getCurrentLocationService != null)
            this.getCurrentLocationService.unsubscribe();
        if (this.findUserAirportService != null)
            this.findUserAirportService.unsubscribe();
        if (this.findDestAirportService != null)
            this.findDestAirportService.unsubscribe();
        if (this.searchService != null)
            this.searchService.unsubscribe();
        if (this.showSuggestionsService != null)
            this.showSuggestionsService.unsubscribe();
        if (this.showDestSuggestionsService != null)
            this.showDestSuggestionsService.unsubscribe();
    };
    TransportationsComponent.prototype.validForm = function () {
        if ((this.adults + this.children + this.infants) > 0 && this.arrivalSearch != null && this.selectValue != " " && this.selectClass != " " && this.departSearch != " "
            && this.departure_date != null) {
            this.valid = true;
        }
        else {
            this.valid = false;
        }
        console.log("valid:" + this.valid);
        return this.valid;
    };
    __decorate([
        core_1.ViewChild('departDateBox'), 
        __metadata('design:type', Object)
    ], TransportationsComponent.prototype, "departDateBox", void 0);
    __decorate([
        core_1.ViewChild('departDatepicker'), 
        __metadata('design:type', Object)
    ], TransportationsComponent.prototype, "departDatepicker", void 0);
    __decorate([
        core_1.ViewChild('returnDateBox'), 
        __metadata('design:type', Object)
    ], TransportationsComponent.prototype, "returnDateBox", void 0);
    __decorate([
        core_1.ViewChild('returnDatepicker'), 
        __metadata('design:type', Object)
    ], TransportationsComponent.prototype, "returnDatepicker", void 0);
    TransportationsComponent = __decorate([
        core_1.Component({
            selector: 'trans',
            templateUrl: 'app/resort/resort-transportations.component.html',
            providers: [TransportationService_1.TransportationService],
            host: {
                '(document:click)': 'onClick($event)',
            },
            styleUrls: ['app/resort/resort-transportations.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, core_1.ElementRef, TransportationService_1.TransportationService, FlightCheckoutService_1.FlightCheckoutService])
    ], TransportationsComponent);
    return TransportationsComponent;
}());
exports.TransportationsComponent = TransportationsComponent;
//# sourceMappingURL=resort-transportations.component.js.map
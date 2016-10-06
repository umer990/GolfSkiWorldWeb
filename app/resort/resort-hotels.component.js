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
var resort_hotels_service_1 = require('./resort-hotels.service');
var HotelsComponent = (function () {
    function HotelsComponent(route, router, hotelService1) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.hotelService1 = hotelService1;
        this.Hotels = [];
        this.minDate = new Date();
        this.room = 1;
        this.imageUrl = function (url) {
            return "http://" + (url.split('{', 2)[0] + url.split('{', 2)[1] + 'rmt.jpg').replace(':', '');
            ;
        };
        hotelService1.getHotels()
            .subscribe(function (data) { return _this.Hotels = data; }),
            function (error) { return alert(error); },
            function () { return console.log("Date get finished"); };
    }
    HotelsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.destLat = params['lat'];
            _this.destLng = params['lng'];
        });
    };
    HotelsComponent.prototype.clickStartDate = function (event) {
        console.log("event:" + event);
        this.departure_date = event;
        console.log("depart:" + this.departure_date);
        this.showDepartureTimePicker = false;
    };
    HotelsComponent.prototype.onFocusStartDate = function () {
        this.showDepartureTimePicker = !this.showDepartureTimePicker;
    };
    HotelsComponent.prototype.clickReturnDate = function (event) {
        this.return_date = event;
        this.showReturnTimePicker = false;
    };
    HotelsComponent.prototype.onFocusReturnDate = function () {
        this.showReturnTimePicker = !this.showReturnTimePicker;
    };
    HotelsComponent = __decorate([
        core_1.Component({
            selector: 'hotels',
            templateUrl: 'app/resort/resort-hotels.component.html',
            styleUrls: ['app/resort/resort-hotels.component.css'],
            providers: [resort_hotels_service_1.hotelService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, resort_hotels_service_1.hotelService])
    ], HotelsComponent);
    return HotelsComponent;
}());
exports.HotelsComponent = HotelsComponent;
//# sourceMappingURL=resort-hotels.component.js.map
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
var FlightCheckoutService_1 = require('./services/FlightCheckoutService');
var FlightCheckOut = (function () {
    function FlightCheckOut(router, route, flightCheckoutService) {
        this.router = router;
        this.route = route;
        this.flightCheckoutService = flightCheckoutService;
        this.order = new OrderInfo();
    }
    FlightCheckOut.prototype.ngOnInit = function () {
        if (this.flightCheckoutService.selectItem != null) {
            this.item = this.flightCheckoutService.selectItem;
            this.adults = this.flightCheckoutService.adults;
            this.children = this.flightCheckoutService.children;
            this.infants = this.flightCheckoutService.infants;
            if (this.adults > 0) {
                this.order.adults = new Array();
                for (var i = 0; i < this.adults; i++) {
                    var person = new Person();
                    person.type = "Adult";
                    this.order.adults.push(person);
                }
            }
            else {
                this.order.adults = null;
            }
            if (this.children > 0) {
                this.order.children = new Array();
                for (var i = 0; i < this.children; i++) {
                    var person = new Person();
                    person.type = "Child";
                    this.order.children.push(person);
                }
            }
            else {
                this.order.children = null;
            }
        }
    };
    FlightCheckOut = __decorate([
        core_1.Component({
            selector: 'checkout',
            templateUrl: 'app/checkout.component.html',
            providers: [],
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, FlightCheckoutService_1.FlightCheckoutService])
    ], FlightCheckOut);
    return FlightCheckOut;
}());
exports.FlightCheckOut = FlightCheckOut;
var OrderInfo = (function () {
    function OrderInfo() {
    }
    return OrderInfo;
}());
var Person = (function () {
    function Person() {
    }
    return Person;
}());
//# sourceMappingURL=CheckOut.js.map
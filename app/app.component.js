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
var landing_component_1 = require('./landing.component');
var FlightCheckoutService_1 = require('./services/FlightCheckoutService');
var header_component_1 = require('./common/header.component');
var AppComponent = (function () {
    function AppComponent(route, router, flightCheckoutService) {
        this.route = route;
        this.router = router;
        this.flightCheckoutService = flightCheckoutService;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            providers: [FlightCheckoutService_1.FlightCheckoutService],
            template: "\n    \t\t   <header></header>\n   \t\t\t\t<router-outlet></router-outlet>\n                  \n    \t\t\t<a routerLink=\"/admin\">admin</a>\n    \t\t\t  \n    \t\t\t\n    \t\t\t",
            directives: [landing_component_1.LandingComponent, header_component_1.HeaderComponent]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, FlightCheckoutService_1.FlightCheckoutService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
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
var googleMap_component_1 = require('./googleMap.component');
var movies_component_1 = require('./movies.component');
var deals_component_1 = require('./deals.component');
var LandingComponent = (function () {
    function LandingComponent() {
        this.mapStatus = false;
        this.mapLink = "Open Map";
    }
    LandingComponent.prototype.showMap = function () {
        if (!this.mapStatus) {
            this.mapStatus = true;
            this.mapLink = "Close Map";
        }
        else {
            this.mapStatus = false;
            this.mapLink = "Open Map";
        }
    };
    LandingComponent = __decorate([
        core_1.Component({
            selector: 'landingPage',
            templateUrl: 'app/landing.component.html',
            directives: [googleMap_component_1.googleMapComponent, movies_component_1.moviesComponent, deals_component_1.dealsComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], LandingComponent);
    return LandingComponent;
}());
exports.LandingComponent = LandingComponent;
//# sourceMappingURL=landing.component.js.map
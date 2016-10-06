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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var resort_component_1 = require('./resort.component');
var resort_hotels_component_1 = require('./resort-hotels.component');
var resort_restaurants_component_1 = require('./resort-restaurants.component');
var resort_transportations_component_1 = require('./resort-transportations.component');
var resort_deals_component_1 = require('./resort-deals.component');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var ng2_bootstrap_2 = require('ng2-bootstrap/ng2-bootstrap');
var resort_routing_1 = require('./resort.routing');
var ResortModule = (function () {
    function ResortModule() {
    }
    ResortModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                resort_routing_1.resortRouting,
                ng2_bootstrap_1.DatepickerModule,
                ng2_bootstrap_2.Ng2BootstrapModule
            ],
            declarations: [
                resort_component_1.ResortComponent,
                resort_hotels_component_1.HotelsComponent,
                resort_restaurants_component_1.RestaurantsComponent,
                resort_transportations_component_1.TransportationsComponent,
                resort_deals_component_1.DealsComponent
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], ResortModule);
    return ResortModule;
}());
exports.ResortModule = ResortModule;
//# sourceMappingURL=resort.module.js.map
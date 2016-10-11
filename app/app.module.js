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
var core_2 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var core_3 = require('angular2-google-maps/core');
var http_1 = require('@angular/http');
var ng2_uploader_1 = require('ng2-uploader');
var app_routing_1 = require('./app.routing');
var landing_component_1 = require('./landing.component');
var admin_component_1 = require('./admin.component');
var app_component_1 = require('./app.component');
var googleMap_component_1 = require('./googleMap.component');
var movies_component_1 = require('./movies.component');
var awards_component_1 = require('./awards.component');
var ImageModel_component_1 = require('./ImageModel.component');
var resort_module_1 = require('./resort/resort.module');
var header_component_1 = require('./common/header.component');
var footer_component_1 = require('./common/footer.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                app_routing_1.routing,
                resort_module_1.ResortModule,
                forms_1.FormsModule,
                core_3.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyAK87mrQKVrqrRPg9hSiX_L0WI6yjetGFI'
                })
            ],
            declarations: [
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                app_component_1.AppComponent,
                landing_component_1.LandingComponent,
                googleMap_component_1.googleMapComponent,
                movies_component_1.moviesComponent,
                ImageModel_component_1.ImageModalComponent,
                admin_component_1.AdminComponent,
                awards_component_1.AwardsComponent,
                ng2_uploader_1.UPLOAD_DIRECTIVES
            ],
            providers: [
                app_routing_1.appRoutingProviders, { provide: core_2.LocationStrategy, useClass: core_2.HashLocationStrategy }
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
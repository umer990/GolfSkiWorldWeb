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
var deal_service_1 = require('./deal.service');
var dealsComponent = (function () {
    function dealsComponent(_DealsService) {
        var _this = this;
        this._DealsService = _DealsService;
        this._DealsService.getLastMinutes()
            .subscribe(function (deals) {
            _this.dealsList = deals;
        }),
            function (error) { return console.log(error); };
    }
    dealsComponent = __decorate([
        core_1.Component({
            selector: 'deals',
            templateUrl: 'app/deals.component.html',
            providers: [deal_service_1.DealsService1]
        }), 
        __metadata('design:paramtypes', [deal_service_1.DealsService1])
    ], dealsComponent);
    return dealsComponent;
}());
exports.dealsComponent = dealsComponent;
//# sourceMappingURL=deals.component.js.map
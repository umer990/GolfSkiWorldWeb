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
var myGlobals = require('./constants');
var DealsService1 = (function () {
    function DealsService1(http) {
        this.http = http;
    }
    DealsService1.prototype.getLastMinutes = function () {
        return this.http.get(myGlobals.LASTMINUTES_URL)
            .map(this.lastMinutes)
            .catch(this.handleError);
    };
    DealsService1.prototype.getDeals = function () {
        return this.http.get(myGlobals.LASTMINUTES_URL)
            .map(this.deals)
            .catch(this.handleError);
    };
    DealsService1.prototype.deals = function (res) {
        console.log(res);
        var body = res.json();
        return body['deals'] || {};
    };
    DealsService1.prototype.lastMinutes = function (res) {
        console.log(res);
        var body = res.json();
        return body['lastminutes'] || {};
    };
    DealsService1.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    DealsService1 = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DealsService1);
    return DealsService1;
}());
exports.DealsService1 = DealsService1;
//# sourceMappingURL=deal.service.js.map
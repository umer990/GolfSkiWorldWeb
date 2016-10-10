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
var http_1 = require('@angular/http');
var myGlobals = require('./constants');
var UploadService = (function () {
    function UploadService(http) {
        this.http = http;
    }
    /*
    This does nothing more than fetching the policy and signature from a node backend
    Check this for more info:
    http://stackoverflow.com/questions/18476217/amazon-s3-post-api-and-signing-a-policy-with-nodejs
     */
    UploadService.prototype.getPolicy = function (directory) {
        console.log('fetching Policy and Signature');
        var params = JSON.stringify({ directory: directory });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(myGlobals.GOLFCOURSE_URL, params, {
            headers: headers
        })
            .map(function (response) { return response.json(); });
    };
    UploadService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UploadService);
    return UploadService;
}());
exports.UploadService = UploadService;
//# sourceMappingURL=awards.service.js.map
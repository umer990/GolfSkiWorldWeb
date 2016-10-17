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
var awards_service_1 = require('./awards.service');
var myGlobals = require('./constants');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var googleMap_service_1 = require('./googleMap.service');
var AwardsComponent = (function () {
    function AwardsComponent(_uploadService, geoService, http) {
        this._uploadService = _uploadService;
        this.geoService = geoService;
        this.http = http;
        this.user = 1;
        this.site = 1;
        this.mediatype = 2;
        this.errorMessage = null;
        this.hasBaseDropZoneOver = false;
        this.progress = 0;
        this.responses = [];
        this.formdata = new FormData();
        this.uploadEvents = new core_1.EventEmitter();
        this.options = {
            url: myGlobals.Destination,
            //url: 'http://test.golfskiworld.com/admin/api',
            filterExtensions: true,
            allowedExtensions: ['video/mp4', 'video/m4v'],
            calculateSpeed: true,
            autoUpload: false,
            previewUrl: true,
            data: {
                site: this.site,
                user: this.user,
                mediatype: this.mediatype
            }
        };
    }
    AwardsComponent.prototype.ngOnInit = function () {
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        //  this.upload();
        console.log(this.zone.isStable);
    };
    AwardsComponent.prototype.handleUpload = function (data) {
        var _this = this;
        this.zone.run(function () {
            _this.responses = data;
            _this.progress = Math.floor(data.progress.percent / 100);
            console.log("Response:" + JSON.stringify(_this.responses));
            console.log("Progress:" + _this.progress);
        });
        console.log(data['status']);
        if (data['status'] == 200) {
            this.errorMessage = "Your movie Uploaded successfully!";
            this.name = "";
            this.description = "";
            this.previewData = "";
        }
        else {
            this.errorMessage = "Selected movie is not Uploadable";
        }
        /*
       if(this.progress){
                   this.name=""
                   this.description=""
                   
                   this.previewData=""
       }*/
    };
    AwardsComponent.prototype.handlePreviewData = function (data) {
        var _this = this;
        this.previewData = data;
        this.geoService.getCurrentLocation()
            .subscribe(function (location) {
            _this.longitude = _this.geoService.split(location, 0);
            _this.latitude = _this.geoService.split(location, 1);
            _this.options = {
                url: myGlobals.Destination,
                filterExtensions: true,
                allowedExtensions: ['video/mp4', 'video/m4v'],
                calculateSpeed: true,
                autoUpload: false,
                previewUrl: true,
                data: {
                    site: _this.site,
                    user: _this.user,
                    mediatype: _this.mediatype,
                    name: _this.name,
                    description: _this.description,
                    longitude: _this.longitude,
                    latitude: _this.latitude,
                    movie: data,
                }
            };
        }, function (error) { return _this.errorMessage = error; });
    };
    AwardsComponent.prototype.startUpload = function () {
        console.log("upload started! OPtions are" + JSON.stringify(this.options["data"]));
        console.log("Upload status:" + this.uploadEvents.emit('startUpload'));
    };
    AwardsComponent = __decorate([
        core_1.Component({
            selector: 'awards',
            templateUrl: 'app/awards.component.html',
            styleUrls: ['app/awards.component.css'],
            providers: [awards_service_1.UploadService, googleMap_service_1.LocationService]
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [awards_service_1.UploadService, googleMap_service_1.LocationService, http_1.Http])
    ], AwardsComponent);
    return AwardsComponent;
}());
exports.AwardsComponent = AwardsComponent;
//# sourceMappingURL=awards.component.js.map
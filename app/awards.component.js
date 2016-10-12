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
var header_component_1 = require('./common/header.component');
var awards_service_1 = require('./awards.service');
var myGlobals = require('./constants');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var googleMap_service_1 = require('./googleMap.service');
var AwardsComponent = (function () {
    function AwardsComponent(_uploadService, geoService, http) {
        this._uploadService = _uploadService;
        this.geoService = geoService;
        this.http = http;
        this.hasBaseDropZoneOver = false;
        this.progress = 0;
        this.responses = [];
        this.formdata = new FormData();
        this.uploadEvents = new core_1.EventEmitter();
        this.options = {
            url: myGlobals.golfskiworld_URL + '/adventure/destination',
            //url: 'http://test.golfskiworld.com/admin/api',
            filterExtensions: true,
            allowedExtensions: ['video/mp4'],
            calculateSpeed: true,
            autoUpload: false,
            previewUrl: true,
            data: {
                site: 1,
                user: 1,
                mediatype: 2,
                name: 'name',
                description: 'User Movie from web',
                longitude: 57.7072,
                latitude: 11.9668
            }
        };
        this.PageName = "This is Awards Page";
        this.description = "Movie from web";
        this.filename = this.makeid();
        this.errorMessage = null;
        this.InProcess = false;
    }
    AwardsComponent.prototype.ngOnInit = function () {
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        //  this.upload();
    };
    AwardsComponent.prototype.handleUpload = function (data) {
        var _this = this;
        this.zone.run(function () {
            _this.responses = data;
            _this.progress = Math.floor(data.progress.percent / 100);
        });
        if (data && data.response) {
            console.log(data);
            data = JSON.parse(data.response);
            this.uploadFile = data;
        }
    };
    AwardsComponent.prototype.handlePreviewData = function (data) {
        this.previewData = data;
        var video = document.createElement("video");
        video.setAttribute("scr", "https://s3.amazonaws.com/golfskiworld/movies/destination/2016-10-12.08-37-46.340603.mp4");
        var canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        var dataURI = canvas.toDataURL('image/jpeg');
        console.log(dataURI);
        this.options = {
            url: myGlobals.golfskiworld_URL + '/adventure/destination',
            //url: 'http://test.golfskiworld.com/admin/api',
            filterExtensions: true,
            allowedExtensions: ['video/mp4'],
            calculateSpeed: true,
            autoUpload: false,
            previewUrl: true,
            data: {
                site: 1,
                user: 1,
                mediatype: 2,
                name: 'name',
                description: 'User Movie from web',
                longitude: 57.7072,
                latitude: 11.9668,
                movie: data,
            }
        };
    };
    AwardsComponent.prototype.startUpload = function () {
        console.log("upload started");
        console.log("Upload status:" + this.uploadEvents.emit('startUpload'));
    };
    AwardsComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    AwardsComponent.prototype.upload = function () {
        var _this = this;
        console.log("start");
        //let formData: FormData = new FormData();
        var formdata = new FormData();
        var xhr = new XMLHttpRequest();
        this.geoService.getCurrentLocation()
            .subscribe(function (location) {
            _this.longitude = _this.geoService.split(location, 0);
            _this.latitude = _this.geoService.split(location, 1);
            _this.options = {
                url: myGlobals.golfskiworld_URL + '/adventure/destination',
                //url: 'http://test.golfskiworld.com/admin/api',
                filterExtensions: true,
                allowedExtensions: ['video/mp4'],
                data: {
                    site: 1,
                    user: 1,
                    mediatype: 1,
                    name: 'name',
                    description: 'description',
                    longitude: 57.7072,
                    latitude: 11.9668
                }
            };
            /*formdata.append('site', '1');
            formdata.append('user', '1');
            formdata.append('mediatype', '1');
            formdata.append('name', 'name');
            formdata.append('description', this.description);
            formdata.append('longitude', this.longitude);
            formdata.append('latitude', this.latitude);*/
            //formdata.append('thumbnail', '');
            // formdata.append('movie', { name: this.file.name, type: 'video/mp4'});
            /*
             console.log(formdata.get("site"));
             console.log(formdata.get("user"));
             console.log(formdata.get("mediatype"));
             console.log(formdata.get("name"));
             console.log(formdata.get("description"));
             console.log(formdata.get("longitude"));
             console.log(formdata.get("latitude"));
             console.log("uri:"+ this.file + ",name:"+this.filename)*/
            //xhr.open('POST',myGlobals.golfskiworld_URL + '/adventure/destination',true);
            //xhr.send(formdata);
            // this.postCall(formdata).subscribe(val => console.log(val),error => this.errorMessage = error);
        }, function (error) { return _this.errorMessage = error; });
    };
    AwardsComponent.prototype.postCall = function (formdata) {
        var headers = new http_1.Headers({ 'Accept': 'application/json',
            'Content-Type': 'multipart/form-data' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(formdata);
        this.InProcess = true;
        console.log("before post call" + formdata);
        return this.http.post(myGlobals.golfskiworld_URL + '/adventure/destination', formdata, headers)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AwardsComponent.prototype.extractData = function (res) {
        this.InProcess = false;
        console.log("inside success");
        if (res.status >= 300)
            console.log('Upload failed', JSON.stringify(res));
        /*  else
              console.log('Upload succeed','You adventure has been uploaded successfully');
*/
        var body = res.json();
        console.log(body);
        return body || {};
    };
    AwardsComponent.prototype.handleError = function (error) {
        this.InProcess = false;
        console.log("inside Error");
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error("Error:" + errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    //Map file on change
    AwardsComponent.prototype.onChange = function (event) {
        var files = event.srcElement.files;
        this.file = files[0];
        console.log(this.file);
    };
    AwardsComponent.prototype.handleResponse = function (response) {
        this.policy = response.policy;
        this.s3signature = response.signature;
    };
    //Function to build timestamp
    AwardsComponent.prototype.buildTimestamp = function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var timestamp = year + month + day;
        return timestamp;
    };
    AwardsComponent.prototype.makeid = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    AwardsComponent = __decorate([
        core_1.Component({
            selector: 'awards',
            templateUrl: 'app/awards.component.html',
            styleUrls: ['app/awards.component.css'],
            directives: [header_component_1.HeaderComponent],
            providers: [awards_service_1.UploadService, googleMap_service_1.LocationService]
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [awards_service_1.UploadService, googleMap_service_1.LocationService, http_1.Http])
    ], AwardsComponent);
    return AwardsComponent;
}());
exports.AwardsComponent = AwardsComponent;
/*
        //Build AWS S3 Request
        formData.append('key','test/' + file.name);
        formData.append('acl','private');
        formData.append('Content-Type','image/jpeg');
        formData.append('x-amz-meta-uuid','14365123651274');
        //Put in your access key here
        formData.append('X-Amz-Credential','AKIAJZ4R7CL6N5YVPIFA/'+this.buildTimestamp()+'/eu-central-1/s3/aws4_request');

        formData.append('X-Amz-Algorithm','AWS4-HMAC-SHA256');
        formData.append('X-Amz-Date',this.buildTimestamp()+'T000000Z');
        formData.append('x-amz-meta-tag','');
        formData.append('Policy',this.policy);
        formData.append('X-Amz-Signature',this.s3signature);
        formData.append('file',this.file);
*/
// xhr.open('POST',myGlobals.GOLFCOURSE_URL,true);
//xhr.send(formdata);
/*
function mobileuploadingCode(){
var formdata = new FormData();
var filename = makeid();

formdata.append('movie', {uri: videoUri, name: filename, type: 'video/mp4'});

formdata.append('site', 1);
formdata.append('user', 1);

formdata.append('name', name);
formdata.append('description', description);
formdata.append('longitude', longitude);
formdata.append('latitude', latitude);

var API_URL = 'http://test.golfskiworld.com/admin/api';

fetch(API_URL + '/adventure/destination',
{
 headers: {
  'Accept': 'application/json',
  'Content-Type': 'multipart/form-data',
 },
 method: "POST",
 body: formdata
})
.then(function(response) {
 console.log("response: " + JSON.stringify(response));

 if (response.status != 200)
  alert('Upload failed', JSON.stringify(response));
 else
  alert('Upload succeed','You adventure has been uploaded successfully');
});
}*/
//# sourceMappingURL=awards.component.js.map
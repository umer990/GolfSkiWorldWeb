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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var movieService = (function () {
    function movieService(http) {
        this.http = http;
        this.base_url = "http://test.golfskiworld.com/admin/api/adventure/destination";
    }
    movieService.prototype.getMovies1 = function () {
        return this.http.get(this.base_url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    movieService.prototype.getMovies = function () {
        var images = [{
                'type': 'video',
                'url': 'https://s3.amazonaws.com/golfskiworld.com/images/destination/2016-09-10.15-58-44.949430.jpeg',
                'thumbUrl': 'https://s3.amazonaws.com/golfskiworld.com/images/destination/2016-09-10.15-58-44.949430.jpeg'
            }, {
                'type': 'video',
                'url': 'https://s3.amazonaws.com/golfskiworld.com/images/destination/2016-09-10.15-58-44.949430.jpeg',
                'thumbUrl': 'https://s3.amazonaws.com/golfskiworld.com/images/destination/2016-09-10.15-58-44.949430.jpeg'
            }, {
                'type': 'video',
                'url': 'https://www.youtube.com/watch?v=khrAhOrSZQc',
                'thumbUrl': 'https://i.ytimg.com/vi/khrAhOrSZQc/1.jpg'
            }, {
                'type': 'video',
                'url': 'https://www.youtube.com/watch?v=N7TkK2joi4I',
                'thumbUrl': 'https://i.ytimg.com/vi/N7TkK2joi4I/1.jpg'
            }, {
                'url': 'https://upload.wikimedia.org/wikipedia/commons/0/07/Kamp_Alexisdorf_3.jpg',
                'thumbUrl': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Kamp_Alexisdorf_3.jpg/120px-Kamp_Alexisdorf_3.jpg'
            }, {
                'type': 'video',
                'url': 'https://www.youtube.com/watch?v=khrAhOrSZQc',
                'thumbUrl': 'https://i.ytimg.com/vi/khrAhOrSZQc/1.jpg'
            }];
        return images; //rest call or call something
    };
    movieService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(body);
        return body["destinations"] || {};
    };
    movieService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error("Error:" + errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    movieService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], movieService);
    return movieService;
}());
exports.movieService = movieService;
//# sourceMappingURL=movies.service.js.map
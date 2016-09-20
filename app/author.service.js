System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1;
    var AuthorsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            AuthorsService = (function () {
                function AuthorsService(http) {
                    this.http = http;
                    this.movieName = "Silicon Valley";
                    this.movieUrl = "https://www.omdbapi.com/?t=" + this.movieName + "&Season=1";
                    this.data = ["AuthNew1", "AuthNew2", "AuthNew3"];
                    this.privete = this.movies;
                }
                AuthorsService.prototype.getAuthors = function () {
                    return (this.data); //rest call or call something
                };
                AuthorsService.prototype.getAuthors1 = function (id) {
                    return (this.data[id]);
                };
                AuthorsService.prototype.getAuthorsInsert = function (AuthorNew) {
                    this.data.push(AuthorNew);
                };
                AuthorsService.prototype.getTime = function () {
                    return this.http.get(this.movieUrl)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                AuthorsService.prototype.getMovies = function () {
                    return this.http.get(this.movieUrl)
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                AuthorsService.prototype.extractData = function (res) {
                    var body = res.json();
                    console.log(body.data);
                    return body["Title"] || {};
                };
                AuthorsService.prototype.handleError = function (error) {
                    // In a real world app, we might use a remote logging infrastructure
                    // We'd also dig deeper into the error to get a better message
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    console.error("Error:" + errMsg); // log to console instead
                    return Observable_1.Observable.throw(errMsg);
                };
                AuthorsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AuthorsService);
                return AuthorsService;
            }());
            exports_1("AuthorsService", AuthorsService);
        }
    }
});
//# sourceMappingURL=author.service.js.map
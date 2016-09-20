System.register(['angular2/core', './author.service'], function(exports_1, context_1) {
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
    var core_1, author_service_1;
    var AuthorsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (author_service_1_1) {
                author_service_1 = author_service_1_1;
            }],
        execute: function() {
            AuthorsComponent = (function () {
                function AuthorsComponent(authorsService) {
                    this.authorsService = authorsService;
                    this.title = "Its title course ";
                    this.authors = authorsService.getAuthors();
                    this.authorNew = authorsService.getAuthors1(1);
                    authorsService.getAuthorsInsert("AuthorInserted");
                    this.authorAdded = authorsService.getAuthors();
                    console.log(this.movies);
                }
                AuthorsComponent.prototype.some = function (data1) {
                    //  console.log(body.data)
                    var body = data1.json();
                    console.log(body.data);
                    return body.data || {};
                };
                AuthorsComponent.prototype.onTestGet = function () {
                    var _this = this;
                    this.authorsService.getTime()
                        .subscribe(function (data) { return _this.getData = JSON.stringify(data); }, function (error) { return alert(error); }, function () { return console.log("Date get finished"); });
                };
                AuthorsComponent.prototype.onMoviesGet = function () {
                    var _this = this;
                    this.authorsService.getMovies()
                        .subscribe(function (data) { return _this.movies = JSON.stringify(data); }, function (error) { return alert(error); }, function () { return console.log("Date get finished"); });
                };
                AuthorsComponent = __decorate([
                    core_1.Component({
                        selector: 'authors',
                        template: "\n\t<h2>authors</h2>\n\t{{title}}\n\t<h2>Get Json Time</h2>\n\t<button (click)=\"onTestGet()\">Get Time</button>\n\t<p>{{getData}}</p>\n\t<h2>Get Json Movies</h2>\n\t<button (click)=\"onMoviesGet()\">Get Movies</button>\n\t<p>{{movies}}</p>\n\t<ul>\n\t<li *ngFor=\"#author of authors\">\n\t{{author}}\n\n\t</li>\n\t</ul>\n\t{{authorNew}}\n\t<ul>\n\t<li *ngFor=\"#author of authors\">\n\t{{author}}\n\n\t</li>\n\t</ul>\n\t{{authors[0]}}\n\t",
                        providers: [author_service_1.AuthorsService]
                    }), 
                    __metadata('design:paramtypes', [author_service_1.AuthorsService])
                ], AuthorsComponent);
                return AuthorsComponent;
            }());
            exports_1("AuthorsComponent", AuthorsComponent);
        }
    }
});
//# sourceMappingURL=author.component.js.map
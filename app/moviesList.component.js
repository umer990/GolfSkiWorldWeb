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
    var MoviesListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (author_service_1_1) {
                author_service_1 = author_service_1_1;
            }],
        execute: function() {
            MoviesListComponent = (function () {
                function MoviesListComponent(authorService) {
                    this.authorService = authorService;
                    this.mode = 'Observable';
                }
                MoviesListComponent.prototype.ngOnInit = function () { this.getMovies(); };
                MoviesListComponent.prototype.getMovies = function () {
                    var _this = this;
                    this.authorService.getMovies()
                        .subscribe(function (movies) { return _this.movies = movies; }, function (error) { return _this.errorMessage = error; });
                };
                MoviesListComponent = __decorate([
                    core_1.Component({
                        selector: 'movies',
                        template: "\n      <h2>Movies</h2>\n      \n      \n      {{authorNew}}\n      <ul>\n      <li *ngFor=\"#author of movies\">\n      {{author}}\n\n      </li>\n      </ul>\n      {{movies[0]}}\n      ",
                        providers: [author_service_1.AuthorsService]
                    }), 
                    __metadata('design:paramtypes', [author_service_1.AuthorsService])
                ], MoviesListComponent);
                return MoviesListComponent;
            }());
            exports_1("MoviesListComponent", MoviesListComponent);
        }
    }
});
//# sourceMappingURL=moviesList.component.js.map
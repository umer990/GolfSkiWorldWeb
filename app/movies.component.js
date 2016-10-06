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
var movies_service_1 = require('./movies.service');
var ImageModel_component_1 = require('./ImageModel.component');
var moviesComponent = (function () {
    function moviesComponent(moviesService) {
        var _this = this;
        this.title = "Movies loads here ";
        this.openModalWindow = false;
        this.images = [];
        this.addImages = function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var destination = data[i];
                this.images.push({
                    'type': !destination.movie ? 'image' : 'video',
                    'thumb': !destination.movie ? destination.thumbnail : destination.movie,
                    'img': !destination.thumbnail ? destination.movie : destination.thumbnail
                });
            }
        };
        moviesService.getMovies1()
            .subscribe(function (data) { return _this.addImages(data); }),
            function (error) { return alert(error); },
            function () { return console.log("Date get finished"); };
    }
    moviesComponent.prototype.OpenImageModel = function (imageSrc, images) {
        //alert('OpenImages');
        var imageModalPointer;
        for (var i = 0; i < images.length; i++) {
            if (imageSrc === images[i].img) {
                imageModalPointer = i;
                console.log('jhhl', i);
                break;
            }
        }
        this.openModalWindow = true;
        this.images = images;
        this.imagePointer = imageModalPointer;
    };
    moviesComponent.prototype.cancelImageModel = function () {
        this.openModalWindow = false;
    };
    moviesComponent = __decorate([
        core_1.Component({
            selector: 'movies',
            directives: [ImageModel_component_1.ImageModalComponent],
            template: "\n\t\t\t<div ng-if=\"slidesLoaded\" class=\"col-lg-10 col-lg-offset-1\">\n\t\t\t<div ng-if=\"images.length==0\">\n\t\t\t<h4>No avaialable Movies</h4>\n\t\t\t</div>\n                  <div *ngFor=\"let img of images; let i= index\"> \n\t\t        <div class=\"float-left\" *ngIf=\"i <= 2\" >\n\t\t          <a class=\"more\" *ngIf=\"i==2\" (click)=\"OpenImageModel(img.img,images)\"> +{{images.length - 3}} more </a> \n\t\t          <img class=\"list-img\" src=\"{{img.thumb}}\"(click)=\"OpenImageModel(img.img,images)\" alt='Image' />\n\t\t        </div>\n\t\t      </div>\n\t\t    <div *ngIf=\"openModalWindow\">\n\t\t        <ImageModal1 [modalImages]=\"images\" [imagePointer] = \"imagePointer\" (cancelEvent) =\"cancelImageModel()\"></ImageModal1>\n\t\t    </div>\n                    \n            </div>\n\n\n\t\t\t\n\t\t\t",
            providers: [movies_service_1.movieService]
        }), 
        __metadata('design:paramtypes', [movies_service_1.movieService])
    ], moviesComponent);
    return moviesComponent;
}());
exports.moviesComponent = moviesComponent;
//# sourceMappingURL=movies.component.js.map
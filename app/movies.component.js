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
    function moviesComponent(moviesService, _elRef) {
        var _this = this;
        this._elRef = _elRef;
        this.slidesLoaded = false;
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
            this.slidesLoaded = true;
        };
        moviesService.getMovies()
            .subscribe(function (data) { return _this.addImages(data); }),
            function (error) { return alert(error); },
            function () { return console.log("movieService finished"); };
    }
    //dataUri:any;
    moviesComponent.prototype.createThumbnail = function (vdoURL) {
        var video = document.createElement("video");
        vdoURL = "http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v";
        video.setAttribute("scr", vdoURL);
        var canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 40;
        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 3, canvas.width, canvas.height);
        var dataURI = canvas.toDataURL('image/jpeg');
        //console.log(dataURI)
        return dataURI;
    };
    moviesComponent.prototype.ngOnInit = function () {
        /*	var video="https://s3.amazonaws.com/golfskiworld/movies/destination/2016-10-12.08-37-46.340603.mp4"
            var can=this.renderer.createElement(this._elRef.nativeElement, "canvas");
            var ctx=can.getContext("2d");
            can.width="50px"
          can.height="50px"
          ctx.drawImage(video, 0, 0, '50px', '50px');
          */
        //	console.log(jQuery(this._elRef.nativeElement).find('.list-img'));
        //alert("jQuery works")
    };
    moviesComponent.prototype.OpenImageModel = function (imageSrc, images) {
        //alert('OpenImages');
        var imageModalPointer;
        for (var i = 0; i < images.length; i++) {
            if (imageSrc === images[i].img) {
                imageModalPointer = i;
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
            template: "\n\t\t\t<div  class=\"col-lg-10 col-lg-offset-1\">\n\t\t\t\n\t\t\t\t<div *ngIf=\"slidesLoaded\">\n\t\t\t\t\t<div  *ngFor=\"let img of images; let i= index\"> \n\t\t\t\t\t\t\t\t\t<div class=\"float-left\" *ngIf=\"i <= 2\" >\n\t\t\t\t\t\t\t\t\t\t<a class=\"more\" *ngIf=\"i==2\" (click)=\"OpenImageModel(img.img,images)\"> +{{images.length - 3}} more </a> \n\t\t\t\t\t\t\t\t\t\t<img *ngIf='img.movie==\"\"' class=\"list-img\" src=\"{{img.thumb}}\" (click)=\"OpenImageModel(img.img,images)\" alt='Image' />\n\t\t\t\t\t\t\t\t\t\t<img *ngIf='img.movie!=\"\"' class=\"list-img\" src=\"{{createThumbnail(img.movie)}}\" id='{{img.mediatype_id}}' (click)=\"OpenImageModel(img.img,images)\" alt='Image' />\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div *ngIf=\"openModalWindow\">\n\t\t\t\t\t<ImageModal1 [modalImages]=\"images\" [imagePointer] = \"imagePointer\" (cancelEvent) =\"cancelImageModel()\"></ImageModal1>\n\t\t\t\t</div>\n                    \n            </div>\n\n\n\t\t\t\n\t\t\t",
            providers: [movies_service_1.movieService]
        }), 
        __metadata('design:paramtypes', [movies_service_1.movieService, core_1.ElementRef])
    ], moviesComponent);
    return moviesComponent;
}());
exports.moviesComponent = moviesComponent;
//# sourceMappingURL=movies.component.js.map
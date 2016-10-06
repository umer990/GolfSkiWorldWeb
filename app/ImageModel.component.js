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
var ImageModalComponent = (function () {
    function ImageModalComponent(element) {
        this.element = element;
        this.opened = false;
        this.loading = false;
        this.showRepeat = false;
        this.cancelEvent = new core_1.EventEmitter();
        this._element = this.element.nativeElement;
    }
    ImageModalComponent.prototype.ngOnInit = function () {
        this.loading = true;
        if (this.imagePointer >= 0) {
            this.showRepeat = false;
            this.openGallery(this.imagePointer);
        }
        else {
            this.showRepeat = true;
        }
    };
    ImageModalComponent.prototype.closeGallery = function () {
        this.opened = false;
        this.cancelEvent.emit(null);
    };
    ImageModalComponent.prototype.prevImage = function () {
        this.loading = true;
        this.currentImageIndex--;
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.modalImages.length - 1;
        }
        this.openGallery(this.currentImageIndex);
    };
    ImageModalComponent.prototype.nextImage = function () {
        this.loading = true;
        this.currentImageIndex++;
        if (this.modalImages.length === this.currentImageIndex) {
            this.currentImageIndex = 0;
        }
        this.openGallery(this.currentImageIndex);
    };
    ImageModalComponent.prototype.openGallery = function (index) {
        if (!index) {
            this.currentImageIndex = 1;
        }
        this.currentImageIndex = index;
        this.opened = true;
        for (var i = 0; i < this.modalImages.length; i++) {
            if (i === this.currentImageIndex) {
                this.imgSrc = this.modalImages[i].img;
                this.isVideo = this.modalImages[i].type == 'video' ? true : false;
                this.loading = false;
                break;
            }
        }
    };
    __decorate([
        core_1.Input('imageType'), 
        __metadata('design:type', String)
    ], ImageModalComponent.prototype, "imageType", void 0);
    __decorate([
        core_1.Input('modalImages'), 
        __metadata('design:type', Object)
    ], ImageModalComponent.prototype, "modalImages", void 0);
    __decorate([
        core_1.Input('imagePointer'), 
        __metadata('design:type', Number)
    ], ImageModalComponent.prototype, "imagePointer", void 0);
    __decorate([
        core_1.Output('cancelEvent'), 
        __metadata('design:type', Object)
    ], ImageModalComponent.prototype, "cancelEvent", void 0);
    ImageModalComponent = __decorate([
        core_1.Component({
            selector: 'ImageModal1',
            template: "\n   <div class=\"ng-gallery\" *ngIf=\"showRepeat\"> \n     <div *ngFor =\"let i of modalImages; let index = index\">\n       <img src=\"{{ i.thumb }}\" class=\"ng-thumb\" (click)=\"openGallery(index)\" alt=\"Image {{ index + 1 }}\" />\n        \n      </div>\n   </div>\n   <div class=\"ng-overlay\" *ngIf=\"opened\">\n    <div class=\"ng-gallery-content\" >\n    <div class=\"uil-ring-css\" *ngIf=\"loading\"><div></div></div>         \n    <a class=\"close-popup\" (click)=\"closeGallery()\"><i class=\"fa fa-close\"></i></a>\n  \n     <a class=\"nav-left\" *ngIf=\"modalImages.length >1\" (click)=\"prevImage()\"><i class=\"fa fa-angle-left\"></i></a>\n     \n     <img *ngIf=\"!isVideo\" src=\"{{imgSrc}}\" (click)=\"nextImage()\" class=\"effect\" />\n     <video  *ngIf=\"isVideo\" src=\"{{imgSrc}}\"  class=\"effect\" controls=\"\" autoplay=\"\" (click)=\"nextImage()\"  ></video>\n     <a class=\"nav-right\" *ngIf=\"modalImages.length >1\" (click)=\"nextImage()\"><i class=\"fa fa-angle-right\"></i></a>\n       <span class=\"info-text\">{{ currentImageIndex + 1 }}/{{ modalImages.length }} - Image {{currentImageIndex+1}}</span>\n   </div>\n   </div>\n       "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ImageModalComponent);
    return ImageModalComponent;
}());
exports.ImageModalComponent = ImageModalComponent;
//# sourceMappingURL=ImageModel.component.js.map
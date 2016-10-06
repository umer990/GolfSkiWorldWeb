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
var core_2 = require('angular2-google-maps/core');
var AdminComponent = (function () {
    function AdminComponent() {
        this.PageName = "This is Landing property";
        this.lat = 51.5239935252832;
        this.lng = 5.137663903579778;
        this.zoom = 16;
        this.locations = [
            { id: 1, lat: 51.5239935252832, lng: 5.137663903579778, content: 'Kids Jungalow (5p)' },
            { id: 2, lat: 51.523853342911906, lng: 5.1377765563584035, content: 'Kids Jungalow (5p)' },
            { id: 3, lat: 51.5237298485607, lng: 5.137969675407476, content: 'Kids Jungalow (5p)' },
            { id: 4, lat: 51.52355628836575, lng: 5.138066234932012, content: 'Kids Jungalow (5p)' },
            { id: 5, lat: 51.52340275379578, lng: 5.138211074218816, content: 'Kids Jungalow (5p)' },
            { id: 6, lat: 51.523199152806626, lng: 5.138382735595769, content: 'Kids Jungalow (5p)' },
            { id: 7, lat: 51.5229955509073, lng: 5.138511481628484, content: 'Kids Jungalow (5p)' },
            { id: 8, lat: 51.52280529912936, lng: 5.138543668136663, content: 'Kids Jungalow (5p)' },
            { id: 9, lat: 51.523596340777075, lng: 5.138463201866216, content: 'Kids Jungalow (5p)' },
            { id: 700, lat: 51.523372714362736, lng: 5.1386992362595265, content: 'Kids Jungalow (5p)' },
            { id: 101, lat: 51.52329594683302, lng: 5.138838711128301, content: 'Kids Jungalow Giraffe' }
        ];
    }
    AdminComponent.prototype.updateDiv = function (location, infoWindow) {
        var _this = this;
        this.selectedLocation = location;
        this.isClicked = true;
        this.ID = location.id;
        this.content = location.content;
        $(function () {
            $('.gm-style-iw').parent().append('<div class="test">' +
                '<span class="content">' +
                '<span class="ID">' + _this.ID + '</span>' +
                '<span class="content-infowindow">' + _this.content + '</span>' +
                '</span></div>');
        });
        if (this.lastClicked && this.lastClicked !== infoWindow) {
            this.lastClicked.close();
        }
        this.lastClicked = infoWindow;
    };
    AdminComponent.prototype.mapClicked = function ($event) {
        this.isClicked = false;
        if (this.lastClicked) {
            this.lastClicked.close();
            this.lastClicked = null;
        }
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'adminPage',
            directives: [core_2.ANGULAR2_GOOGLE_MAPS_DIRECTIVES, core_2.SebmGoogleMap, core_2.SebmGoogleMapMarker],
            styles: ["\n    .sebm-google-map-container {\n       height: 300px;\n     }\n     \n     #ethiopian-desert {\n       width: 40px;\n       height: 40px;\n       background-color: red;\n    \n     }\n  "],
            template: "\n  \n  <sebm-google-map (mapClick)=\"mapClicked($event)\" [latitude]=\"lat\" [longitude]=\"lng\" [zoom]=\"zoom\">\n    \n        <sebm-google-map-marker [iconUrl]=\"location.iconUrl\" *ngFor=\"let location of locations\" [latitude]=\"location.lat\" [longitude]=\"location.lng\" [label]=\"location.id\" (markerClick)=\"updateDiv(location, infowindow)\">\n            <sebm-google-map-info-window #infowindow [disableAutoPan]=\"true\">{{ location.id }} {{ location.content }}</sebm-google-map-info-window>\n        </sebm-google-map-marker>\n   \n</sebm-google-map>\n\n  <section *ngIf=\"isClicked\" id=\"ethiopian-desert\">\n    <div *ngIf=\"selectedLocation\" class=\"result-number\">\n      {{ selectedLocation.id }}\n  </div>\n  </section>\n" }), 
        __metadata('design:paramtypes', [])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
// ANGULAR2_GOOGLE_MAPS_PROVIDERS is required here
//bootstrap(App, [ANGULAR2_GOOGLE_MAPS_PROVIDERS])
//# sourceMappingURL=admin.component.js.map
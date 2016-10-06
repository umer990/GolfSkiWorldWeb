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
var router_1 = require('@angular/router');
var locationService_1 = require('./locationService');
var googleMap_service_1 = require('./googleMap.service');
var googleMapComponent = (function () {
    function googleMapComponent(router, route, geoService) {
        this.router = router;
        this.route = route;
        this.geoService = geoService;
        this.title = "Map loads here ";
        this.searchValue = "";
        this.zoom = 4;
        this.errorMessage = null;
    }
    googleMapComponent.prototype.ngOnInit = function () {
        this.getCurrentService();
    };
    // get User Location according to IP address
    googleMapComponent.prototype.getCurrentService = function () {
        var _this = this;
        var zoomlevel = this.zoom;
        this.geoService.getCurrentLocation()
            .subscribe(function (location) {
            _this.baseLat = _this.geoService.split(location, 0);
            _this.baseLng = _this.geoService.split(location, 1);
        }, function (error) { return _this.errorMessage = error; });
        // get all the resorts through the rest services   
        this.geoService.getGolfResorts().subscribe(function (res) {
            var items = new Array();
            for (var i = 0; i < res.length; i++) {
                res[i].iconUrl = "../img/icon_golf.png";
                items.push(res[i]);
            }
            _this.coordinatesList = items;
            _this.fillCoordinatesTobeShown(items);
            console.log(items);
            _this.geoService.getSkiResorts().subscribe(function (res) {
                for (var i = 0; i < res.length; i++) {
                    res[i].iconUrl = "../img/icon_ski.png";
                    items.push(res[i]);
                }
                _this.coordinatesList = items;
                _this.fillCoordinatesTobeShown(items);
                console.log(items);
            }, function (error) { return _this.errorMessage = error; });
        }, function (error) { return _this.errorMessage = error; });
    };
    // if we use navigator.geolocation to get user Location
    /*
          fillUserLocation(position:any){
           this.baseLat = position.coords.latitude;
           this.baseLng = position.coords.longitude;
           console.log("coord"+this.baseLat+"  "+this.baseLng);
        }*/
    googleMapComponent.prototype.fillCoordinatesTobeShown = function (coordinatesList) {
        var coordinatesTobeShown = new Array();
        if (coordinatesList != null) {
            for (var _i = 0, coordinatesList_1 = coordinatesList; _i < coordinatesList_1.length; _i++) {
                var a = coordinatesList_1[_i];
                if (this.zoom <= a.zoomMax && this.zoom >= a.zoomMin) {
                    coordinatesTobeShown.push(a);
                }
            }
            this.coordinatesTobeShown = coordinatesTobeShown;
            console.log(this.coordinatesTobeShown);
        }
    };
    // change the base Location when use click on the map
    googleMapComponent.prototype.mapClicked = function ($event) {
        this.baseLat = $event.coords.lat;
        this.baseLng = $event.coords.lng;
        console.log("coord" + this.baseLat + "  " + this.baseLng);
    };
    // when the zoom level is changed, different coords should be shown
    googleMapComponent.prototype.zoomChange = function ($event) {
        console.log($event);
        this.zoom = $event;
        if (this.searchValue == "") {
            this.fillCoordinatesTobeShown(this.coordinatesList);
        }
        else {
            this.fillCoordinatesTobeShown(this.searchAggResults);
        }
    };
    //launch to the deatil page with coords
    googleMapComponent.prototype.gotoDetail = function (lat, lng) {
        var navigationExtras = {
            queryParams: { 'lat': lat, 'lng': lng },
        };
        this.router.navigate(['/resort'], navigationExtras);
    };
    // show the markers in the google map base on the value in the search box
    googleMapComponent.prototype.onSearch = function (value) {
        console.log(value);
        this.searchValue = value;
        if (this.searchValue == "") {
            this.fillCoordinatesTobeShown(this.coordinatesList);
            this.searchResults = null;
        }
        else {
            var searchResults = new Array();
            for (var _i = 0, _a = this.coordinatesList; _i < _a.length; _i++) {
                var a = _a[_i];
                if (a.zoomMin >= 9) {
                    var infoWindow = a.infoWindow;
                    if (infoWindow.name.indexOf(value) != -1 ||
                        infoWindow.address.indexOf(value) != -1 ||
                        infoWindow.shortDiscription.indexOf(value) != -1 ||
                        infoWindow.telNo.indexOf(value) != -1 ||
                        a.type.indexOf(value) != -1 ||
                        a.country.indexOf(value) != -1 ||
                        a.city.indexOf(value) != -1) {
                        searchResults.push(a);
                    }
                }
            }
            this.searchResults = searchResults;
            console.log(searchResults);
            this.searchAggResults = this.geoService.aggreateCoordinates(searchResults);
            this.fillCoordinatesTobeShown(this.searchAggResults);
        }
    };
    googleMapComponent.prototype.updateDiv = function (location, infoWindow) {
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
    googleMapComponent.prototype.mapClicked1 = function ($event) {
        this.baseLat = $event.coords.lat;
        this.baseLng = $event.coords.lng;
        this.isClicked = false;
        if (this.lastClicked) {
            this.lastClicked.close();
            this.lastClicked = null;
        }
    };
    googleMapComponent.prototype.mapClicked = function ($event) {
        this.baseLat = $event.coords.lat;
        this.baseLng = $event.coords.lng;
        console.log("coord" + this.baseLat + "  " + this.baseLng);
    };
    googleMapComponent = __decorate([
        core_1.Component({
            selector: 'googleMap',
            directives: [core_2.GOOGLE_MAPS_DIRECTIVES, core_2.AgmCoreModule],
            styleUrls: ['app/googleMap.component.css'],
            templateUrl: 'app/googleMap.component.html',
            providers: [googleMap_service_1.googleMapService, locationService_1.LocationService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, locationService_1.LocationService])
    ], googleMapComponent);
    return googleMapComponent;
}());
exports.googleMapComponent = googleMapComponent;
//# sourceMappingURL=googleMap.component.js.map
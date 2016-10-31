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
var router_1 = require('@angular/router');
var resort_hotels_service_1 = require('./resort-hotels.service');
var HotelsComponent = (function () {
    function HotelsComponent(route, router, _hotelService) {
        this.route = route;
        this.router = router;
        this._hotelService = _hotelService;
        this.Hotels = [];
        this.minDate = new Date();
        this.showReturnDate = false;
        this.room = 1;
        this.radius = 42;
        this.numberOfResults = 50;
        this.currency = "EUR";
        this.imageUrl = function (url) {
            return "http://" + (url.split('{', 2)[0] + url.split('{', 2)[1] + 'rmt.jpg').replace(':', '');
            ;
        };
        /*this._hotelService.getHotels1()
            .subscribe(
                data=>this.Hotels=data),
                error=>alert(error),
              ()=>console.log("Hotels get finished")*/
    }
    HotelsComponent.prototype.onSearch = function () {
        var _this = this;
        this._hotelService.onSearch(this.destLng, this.destLat, this.radius, this.departure_date, this.return_date, this.currency, this.numberOfResults)
            .subscribe(function (data) { return _this.hotelsList = data; }),
            function (error) { return alert(error); },
            function () { return console.log("Hotels get finished"); };
        /*
       this.searchService= this.service.onSearch(this.departAirport.value,this.arrivalAirport.value,
                      this.departure_date,this.return_date,this.selectClass,this.adults,this.children,this.infants,this.currency
       
              ).subscribe(data=>{this.result=this.convertLowFareSearch(data); console.log(this.result)},
                  error => this.errorMessage = error
              );*/
    };
    HotelsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.destLat = params['lat'];
            _this.destLng = params['lng'];
        });
        this.getCurrentService();
    };
    HotelsComponent.prototype.getCurrentService = function () {
        var _this = this;
        if (window.navigator && window.navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                _this.userLat = pos.coords.latitude,
                    _this.userLng = pos.coords.longitude;
                //this.findUserAirport();
                console.log("ipInfo" + _this.userLat + _this.userLng);
            });
        }
        else {
            this.userLat = 0.0;
            this.userLng = 0.0;
        }
        ;
        /* clickStartDate(event:any) {
         console.log("event:"+event);
         this.departure_date= event;
         console.log("depart:"+this.departure_date);
             this.showDepartureTimePicker = false;
         }
         onFocusStartDate() {
             this.showDepartureTimePicker = !this.showDepartureTimePicker;
         }
         clickReturnDate(event:any) {
         this.return_date= event;
             this.showReturnTimePicker = false;
         }
         onFocusReturnDate() {
             this.showReturnTimePicker = !this.showReturnTimePicker;
         }*/
    };
    HotelsComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component destroyed
        /*
          if(this. getCurrentLocationService!=null)
         this. getCurrentLocationService.unsubscribe();
       if(this. findUserAirportService!=null)
          this.findUserAirportService.unsubscribe();
        if(this. findDestAirportService!=null)
          this.findDestAirportService.unsubscribe();
        if(this. searchService!=null)
          this.searchService.unsubscribe();
        if(this. showSuggestionsService!=null)
          this.showSuggestionsService.unsubscribe();
        if(this. showDestSuggestionsService!=null)
          this.showDestSuggestionsService.unsubscribe();
          */
    };
    HotelsComponent.prototype.onFocusStartDate = function () {
        this.showDepartureTimePicker = !this.showDepartureTimePicker;
    };
    HotelsComponent.prototype.onFocusReturnDate = function () {
        this.showReturnTimePicker = !this.showReturnTimePicker;
    };
    HotelsComponent.prototype.clickReturnDate = function (event) {
        this.return_date = event;
        this.showReturnTimePicker = false;
    };
    HotelsComponent.prototype.clickStartDate = function (event) {
        console.log("event:" + event);
        this.departure_date = event;
        this.showReturnDate = true;
        if (this.showReturnDate) {
            var date = new Date(this.departure_date.getFullYear(), this.departure_date.getMonth(), this.departure_date.getDate() + 1);
            this.return_date = date;
        }
        console.log("depart:" + this.departure_date);
        console.log("return:" + this.return_date);
        this.showDepartureTimePicker = false;
    };
    HotelsComponent.prototype.changeTrip = function (value) {
        //  this.selectValue = value;
        console.log(this.showReturnDate);
        //if(this.selectValue != "Oneway")
        this.showReturnDate = true;
        //else
        //this.showReturnDate=false;
        if (this.showReturnDate) {
            //let date: Date = new Date();
            var date = new Date(this.departure_date.getFullYear(), this.departure_date.getMonth(), this.departure_date.getDate() + 1);
            //date.setDate(this.departure_date.getDate() + 3);
            this.return_date = date;
        }
        else {
            this.return_date = null;
        }
    };
    __decorate([
        core_1.ViewChild('departDateBox'), 
        __metadata('design:type', Object)
    ], HotelsComponent.prototype, "departDateBox", void 0);
    __decorate([
        core_1.ViewChild('departDatepicker'), 
        __metadata('design:type', Object)
    ], HotelsComponent.prototype, "departDatepicker", void 0);
    __decorate([
        core_1.ViewChild('returnDateBox'), 
        __metadata('design:type', Object)
    ], HotelsComponent.prototype, "returnDateBox", void 0);
    __decorate([
        core_1.ViewChild('returnDatepicker'), 
        __metadata('design:type', Object)
    ], HotelsComponent.prototype, "returnDatepicker", void 0);
    HotelsComponent = __decorate([
        core_1.Component({
            selector: 'hotels',
            templateUrl: 'app/resort/resort-hotels.component.html',
            styleUrls: ['app/resort/resort-hotels.component.css'],
            providers: [resort_hotels_service_1.hotelService],
            host: {}
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, resort_hotels_service_1.hotelService])
    ], HotelsComponent);
    return HotelsComponent;
}());
exports.HotelsComponent = HotelsComponent;
//# sourceMappingURL=resort-hotels.component.js.map
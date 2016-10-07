"use strict";
var Coordinates = (function () {
    function Coordinates(lat, lng, zoomMin, zoomMax, count, country, city, type, infoWindow, iconUrl) {
        this.lat = lat;
        this.lng = lng;
        this.zoomMin = zoomMin;
        this.zoomMax = zoomMax;
        this.count = count;
        this.country = country;
        this.city = city;
        this.type = type;
        this.infoWindow = infoWindow;
        this.iconUrl = iconUrl;
    }
    return Coordinates;
}());
exports.Coordinates = Coordinates;
//# sourceMappingURL=coordinates.js.map
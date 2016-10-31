"use strict";
var destination = (function () {
    function destination(UserId, SiteId, mediaType, zoomMax, title, descrition, longitude, latitude, movie) {
        this.UserId = UserId;
        this.SiteId = SiteId;
        this.mediaType = mediaType;
        this.zoomMax = zoomMax;
        this.title = title;
        this.descrition = descrition;
        this.longitude = longitude;
        this.latitude = latitude;
        this.movie = movie;
    }
    return destination;
}());
exports.destination = destination;
//# sourceMappingURL=destination.js.map
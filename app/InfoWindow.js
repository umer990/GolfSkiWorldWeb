"use strict";
var InfoWindow = (function () {
    function InfoWindow(telNo, address, shortDiscription, rating, icons, planButton, name, thumbnail, isOpen) {
        this.telNo = telNo;
        this.address = address;
        this.shortDiscription = shortDiscription;
        this.rating = rating;
        this.icons = icons;
        this.planButton = planButton;
        this.name = name;
        this.thumbnail = thumbnail;
        this.isOpen = isOpen;
    }
    return InfoWindow;
}());
exports.InfoWindow = InfoWindow;
//# sourceMappingURL=InfoWindow.js.map
"use strict";
var ItineraryWithPrice = (function () {
    function ItineraryWithPrice() {
        this.include_in_bound = false;
        this.showDetails = false;
    }
    ItineraryWithPrice.prototype.spilt = function (value, index) {
        //console.log(value);
        var splits = value.split('T');
        return splits[index];
    };
    ItineraryWithPrice.prototype.spiltTime = function (value, index) {
        //console.log(value);
        var splits = value.split(':');
        return Number(splits[index]);
    };
    ItineraryWithPrice.prototype.getHoursBetween = function (date1, date2) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;
        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();
        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
        //take out milliseconds
        difference_ms = difference_ms / 1000;
        difference_ms = difference_ms / 60;
        var minutes = Math.floor(difference_ms % 60);
        difference_ms = difference_ms / 60;
        var hours = Math.floor(difference_ms % 24);
        var days = Math.floor(difference_ms / 24);
        var result = "";
        if (days > 0) {
            result += days + "d ";
        }
        if (hours > 0) {
            result += hours + "h ";
        }
        if (minutes > 0) {
            result += minutes + "m";
        }
        return result;
    };
    return ItineraryWithPrice;
}());
exports.ItineraryWithPrice = ItineraryWithPrice;
//# sourceMappingURL=LowFareSearch.js.map
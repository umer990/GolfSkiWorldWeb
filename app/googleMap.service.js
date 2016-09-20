System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var googleMapService;
    return {
        setters:[],
        execute: function() {
            googleMapService = (function () {
                function googleMapService() {
                }
                googleMapService.prototype.getMap = function () {
                    return ["course1", "ourse2", "course3"]; //rest call or call something
                };
                return googleMapService;
            }());
            exports_1("googleMapService", googleMapService);
        }
    }
});
//# sourceMappingURL=googleMap.service.js.map
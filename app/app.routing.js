"use strict";
var router_1 = require('@angular/router');
var landing_component_1 = require('./landing.component');
var awards_component_1 = require('./awards.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: landing_component_1.LandingComponent },
    { path: 'awards', component: awards_component_1.AwardsComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map
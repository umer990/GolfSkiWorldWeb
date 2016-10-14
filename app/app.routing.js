"use strict";
var router_1 = require('@angular/router');
var landing_component_1 = require('./landing.component');
var admin_component_1 = require('./admin.component');
var awards_component_1 = require('./awards.component');
var movies_component_1 = require('./movies.component');
var CheckOut_1 = require('./CheckOut');
var appRoutes = [
    { path: '', component: landing_component_1.LandingComponent },
    { path: 'home', component: landing_component_1.LandingComponent, name: 'home' },
    { path: 'awards', component: awards_component_1.AwardsComponent },
    { path: 'movie', component: movies_component_1.moviesComponent },
    { path: 'admin', component: admin_component_1.AdminComponent },
    { path: 'checkout', component: CheckOut_1.FlightCheckOut },
    { path: '**', redirectTo: '/home' },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map
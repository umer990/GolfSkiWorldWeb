"use strict";
var router_1 = require('@angular/router');
var resort_component_1 = require('./resort.component');
var resort_hotels_component_1 = require('./resort-hotels.component');
var resort_restaurants_component_1 = require('./resort-restaurants.component');
var resort_transportations_component_1 = require('./resort-transportations.component');
var resort_deals_component_1 = require('./resort-deals.component');
var resortRoutes = [
    { path: 'resort', component: resort_component_1.ResortComponent,
        children: [
            { path: '', component: resort_hotels_component_1.HotelsComponent },
            { path: 'hotels', component: resort_hotels_component_1.HotelsComponent },
            { path: 'restaurants', component: resort_restaurants_component_1.RestaurantsComponent },
            { path: 'transportations', component: resort_transportations_component_1.TransportationsComponent },
            { path: 'deals', component: resort_deals_component_1.DealsComponent }
        ] }
];
exports.resortRouting = router_1.RouterModule.forChild(resortRoutes);
//# sourceMappingURL=resort.routing.js.map
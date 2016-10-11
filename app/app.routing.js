"use strict";
var router_1 = require('@angular/router');
var landing_component_1 = require('./landing.component');
var awards_component_1 = require('./awards.component');
var appRoutes = [
    /*{ path: '',  component: LandingComponent,
       children: [
           { path: 'home',  component: LandingComponent },
           { path: 'awards',  component: AwardsComponent },
           { path: 'admin', component: AdminComponent },
          
           
       ]  }
   */
    { path: '', component: landing_component_1.LandingComponent, name: 'home' },
    { path: 'home', component: landing_component_1.LandingComponent, name: 'home' },
    { path: 'awards', component: awards_component_1.AwardsComponent, name: 'awards' }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map
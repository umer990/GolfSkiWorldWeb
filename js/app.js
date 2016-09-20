/**
 * GOLFSKIMOBILE - Responsive Admin Theme
 *
 */
(function() {
    angular.module('golfskimobile', [
        'ui.router', // Routing
        'oc.lazyLoad', // ocLazyLoad
        'ui.bootstrap', // Ui Bootstrap
        'pascalprecht.translate', // Angular Translate
        'ngIdle', // Idle timer
        'ngSanitize', // ngSanitize
        'bootstrapLightbox'
    ])
})();

// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad
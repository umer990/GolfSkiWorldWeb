/**
 * GOLFSKIMOBILE - Responsive Admin Theme
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    $urlRouterProvider.otherwise("/landing");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('landing', {
            url: "/landing",
            templateUrl: "views/landing.html",
            data: { pageTitle: 'Landing page', specialClass: 'landing-page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'ui.event',
                        files: ['js/plugins/uievents/event.js']
                    }, {
                        name: 'ui.map',
                        files: ['js/plugins/uimaps/ui-map.js']
                    }, {
                        files: ['css/plugins/slick/slick.css', 'css/plugins/slick/slick-theme.css', 'js/plugins/slick/slick.min.js']
                    }, {
                        name: 'slick',
                        files: ['js/plugins/slick/angular-slick.min.js']
                    }, {
                        files: ['js/plugins/ng-videosharing-embed/ng-videosharing-embed.min.js']
                    }]);
                }
            }
        })
        .state('main', {
            abstract: true,
            url: "/main",
            templateUrl: "views/common/content.html"
        })
        .state('main.buyandsell', {
            url: "/buyandsell",
            templateUrl: "views/buy-sell.html"
        })
        .state('main.watchmovie', {
            url: "/watchmovie",
            templateUrl: "views/watch-movie.html"
        })
        .state('main.awardinfo', {
            url: "/awardinfo",
            templateUrl: "views/award-info.html"
        });

};

angular
    .module('golfskimobile')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
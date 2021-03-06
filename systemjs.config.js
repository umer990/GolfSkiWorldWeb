/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: { 
      // paths serve as alias
      'npm:': 'node_modules/',
      //'ng2-simple-page-scroll': 'node_modules/ng2-simple-page-scroll'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      'angular2-google-maps': 'node_modules/angular2-google-maps',
      'ng2-uploader': 'node_modules/ng2-uploader/ng2-uploader',
      'ng2-simple-page-scroll': 'npm:ng2-simple-page-scroll',
      'angular2-google-maps/core': 'node_modules/angular2-google-maps/core/core.umd.js',
      'directives' : 'directives/',
      // other libraries
      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
      'ng2-bootstrap': 'node_modules/ng2-bootstrap',
      'moment': 'node_modules/moment/moment.js',
     
      

    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },  "node_modules/ng2-bootstrap": {
        defaultExtension: "js"
     },  
     'node_modules/angular2-google-maps': {
        defaultExtension: 'js'
    },
    'node_modules/ng2-simple-page-scroll': {
      main: 'ng2-simple-page-scroll.js', 
      defaultExtension: 'js'
    },
     'node_modules/ng2-uploader': {
        defaultExtension: 'js'
    },
      'directives':{ defaultExtension: 'js' } 
    }
    /*
     packageNames.forEach(function (pkgName) {
        packages[pkgName] = {main: 'index.js', defaultExtension: 'js'};
    });*/
  });
})(this);

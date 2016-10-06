"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var header_component_1 = require('./common/header.component');
var AwardsComponent = (function () {
    function AwardsComponent() {
        this.PageName = "This is Awards Page";
    }
    AwardsComponent.prototype.uploadfile = function (event) {
        AWS.config.accessKeyId = 'AKIAJZ4R7CL6N5YVPIFA';
        AWS.config.secretAccessKey = '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';
        var bucket = new AWS.S3({ params: { Bucket: 'golfskiworld.com' } });
        var params = { Key: this.file.name, Body: this.file };
        bucket.upload(params, function (err, data) {
            console.log(err, data);
        });
    };
    AwardsComponent.prototype.fileEvent = function (fileInput) {
        var files = event.target.files;
        var file = files[0];
        this.file = file;
    };
    AwardsComponent = __decorate([
        core_1.Component({
            selector: 'awards',
            templateUrl: 'app/awards.component.html',
            directives: [header_component_1.HeaderComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AwardsComponent);
    return AwardsComponent;
}());
exports.AwardsComponent = AwardsComponent;
//# sourceMappingURL=awards.component.js.map
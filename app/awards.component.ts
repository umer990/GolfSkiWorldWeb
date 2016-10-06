import { Component } from '@angular/core';
import {HeaderComponent} from './common/header.component';


@Component({
	selector:'awards',
	templateUrl:'app/awards.component.html',
	directives:[HeaderComponent]
	
})

export class AwardsComponent{
PageName="This is Awards Page"

	myfile:any;
    file:any;

constructor() {
}

 uploadfile(event) {
        AWS.config.accessKeyId = 'AKIAJZ4R7CL6N5YVPIFA';
        AWS.config.secretAccessKey = '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';
        var bucket = new AWS.S3({params: {Bucket: 'golfskiworld.com'}});
        var params = {Key: this.file.name, Body: this.file};
        bucket.upload(params, function (err, data) {
            console.log(err, data);
        });
    }

fileEvent(fileInput: any){
        var files = event.target.files;
        var file = files[0];
        this.file = file;
    }
}
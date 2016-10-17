import { Component,Injectable,Input, Output, EventEmitter,NgZone } from '@angular/core';
import {UploadService} from './awards.service';
import myGlobals = require('./constants');

import {HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable ,map}     from 'rxjs/Observable';

import 'rxjs/add/operator/map'
import 'rxjs/Rx',
import {LocationService} from './googleMap.service';

@Component({
	selector:'awards',
	templateUrl:'app/awards.component.html',
    styleUrls: ['app/awards.component.css'],

    providers:[UploadService,LocationService]
	
})
@Injectable()
export class AwardsComponent implements OnInit{

  user: number=1;
  site:number=1;
  mediatype:number=2;
  name:string;
  description:string;
  longitude:any;
  latitude:any;
  errorMessage: string = null;
 
constructor(private _uploadService: UploadService,private geoService: LocationService,private http: Http) {}
  
   uploadFile: any;
   hasBaseDropZoneOver: boolean = false;    
   private zone: NgZone;
   
    private progress: number = 0;
    private responses: any[] = [];
    formdata: FormData = new FormData();
    private uploadEvents: EventEmitter<any> = new EventEmitter();
    private previewData : any;
    
    options: Object={
                url: myGlobals.Destination,
                    //url: 'http://test.golfskiworld.com/admin/api',
                filterExtensions: true,
                allowedExtensions: ['video/mp4','video/m4v'],
                calculateSpeed: true,
                autoUpload: false,
                previewUrl: true,
                data: {
                        site: this.site,
                        user: this.user,
                        mediatype:this.mediatype             
                    }
             } ;

 ngOnInit() {
     
        this.zone = new NgZone({ enableLongStackTrace: false });
      //  this.upload();
      console.log(this.zone.isStable);
      }

 handleUpload(data: any): void {
    this.zone.run(() => {
    this.responses = data;
    this.progress = Math.floor(data.progress.percent / 100);
  console.log("Response:"+ JSON.stringify(this.responses))
  console.log("Progress:"+this.progress)
});

console.log(data['status'])
if(data['status']==200)
{
     this.errorMessage="Your movie Uploaded successfully!"
        this.name=""
        this.description=""
        
        this.previewData=""
}
else{
  this.errorMessage="Selected movie is not Uploadable";
  
  }
 /*
if(this.progress){
            this.name=""
            this.description=""
            
            this.previewData=""
}*/
}


handlePreviewData(data: any): void {
this.previewData = data;
this.geoService.getCurrentLocation()
            .subscribe(
                location => {
                    this.longitude = this.geoService.split(location, 0);
                    this.latitude = this.geoService.split(location, 1);
                
        this.options={
                        url: myGlobals.Destination,
                        filterExtensions: true,
                        allowedExtensions: ['video/mp4','video/m4v'],
                        calculateSpeed: true,
                        autoUpload: false,
                        previewUrl: true,
                        data: {
                                site: this.site,
                                user: this.user,
                                mediatype:this.mediatype,
                                name: this.name,
                                description: this.description,
                                longitude:   this.longitude,
                                latitude:  this.latitude,
                                movie:data,                                     
                                    

                            }
                    }
        },
            error => this.errorMessage = error);
    }








startUpload() {
console.log("upload started! OPtions are"+ JSON.stringify(this.options["data"]) )
 console.log("Upload status:"+ this.uploadEvents.emit('startUpload'));
 
}

}

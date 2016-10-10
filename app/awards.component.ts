import { Component } from '@angular/core';
import {HeaderComponent} from './common/header.component';
import {UploadService} from './awards.service';
import myGlobals = require('./constants');
import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable ,map}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/Rx',
import {LocationService} from './googleMap.service';

@Component({
	selector:'awards',
	templateUrl:'app/awards.component.html',
    styleUrls: ['app/awards.component.css'],
	directives:[HeaderComponent],
    providers:[UploadService,LocationService]
	
})
@Injectable()
export class AwardsComponent implements OnInit{
PageName="This is Awards Page"
     policy: String;
    s3signature: String;
    file: File;
	myfile:any;
    longitude:any;
    latitude:any;
    description="Movie from web";
    filename = this.makeid();
    errorMessage: string = null;
    InProcess=false;
    

constructor(private _uploadService: UploadService,private geoService: LocationService,private http: Http) {
  
}
 

    //fetch policy and signature from the server
    //If you are not familiar with ngOnInit
    //This function gets fired at the beginning
    //Hence this is the best place to fetch the signature and policy
    ngOnInit() {
        var formdata1 = {
    key1: 300,
    key2: 'hello world'
};
          
        
        console.log(JSON.stringify(formdata1))
        
    
for (var key in formdata1) {
    console.log(key, formdata1[key]);
   
}

      //  this._uploadService.getPolicy('test').subscribe(response => this.handleResponse(response) );
    }

      upload(){
          console.log("start")
        //let formData: FormData = new FormData();
        let formdata: FormData = new FormData();
        let xhr: XMLHttpRequest = new XMLHttpRequest();

        this.geoService.getCurrentLocation()
            .subscribe(
                location => {
                    this.longitude = this.geoService.split(location, 0);
                    this.latitude = this.geoService.split(location, 1);
               
        
        
        formdata.append('site', '1');
        formdata.append('user', '1');
        formdata.append('mediatype', '1');
        formdata.append('name', 'name');
        formdata.append('description', this.description);
        formdata.append('longitude', this.longitude);
        formdata.append('latitude', this.latitude);
        //formdata.append('thumbnail', '');
       // formdata.append('movie', { name: this.file.name, type: 'video/mp4'});
       
        console.log(formdata.get("site"));
        console.log(formdata.get("user"));
        console.log(formdata.get("mediatype"));
        console.log(formdata.get("name"));
        console.log(formdata.get("description"));
        console.log(formdata.get("longitude"));
        console.log(formdata.get("latitude"));
        console.log("uri:"+ this.file + ",name:"+this.filename)

         xhr.open('POST',myGlobals.golfskiworld_URL + '/adventure/destination',true);
        xhr.send(formdata);
      // this.postCall(formdata).subscribe(val => console.log(val),error => this.errorMessage = error);
        },
                error => this.errorMessage = error);
    }
    postCall(formdata: any){ 
        let headers = new Headers({ 'Accept': 'application/json',
                                        'Content-Type': 'multipart/form-data' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(formdata);
        this.InProcess=true
  
            console.log("before post call"+formdata)
       return this.http.post(myGlobals.golfskiworld_URL + '/adventure/destination', formdata, headers)
                                    .map(this.extractData)
                                    .catch(this.handleError);


    }
     private extractData(res: Response) {
         this.InProcess=false
         console.log("inside success")
       if (res.status >= 300)
                   console.log('Upload failed', JSON.stringify(res));
              /*  else
                    console.log('Upload succeed','You adventure has been uploaded successfully');
*/
        let body = res.json(); console.log(body)
        return body || { };
     }

 private handleError (error: any) {
     this.InProcess=false
            console.log("inside Error")
            // In a real world app, we might use a remote logging infrastructure
            // We'd also dig deeper into the error to get a better message
            let errMsg = (error.message) ? error.message :
              error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error("Error:"+errMsg); // log to console instead
            return Observable.throw(errMsg);
  }
    //Map file on change
    onChange(event) {
        var files = event.srcElement.files;
        this.file = files[0];
        
        console.log(this.file);
    }
 
 handleResponse(response){
        this.policy = response.policy;
        this.s3signature = response.signature;
        
        
    }
   //Function to build timestamp
    buildTimestamp(){
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);

        var timestamp = year+month+day;
        return timestamp;
    }

     makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/*
        //Build AWS S3 Request
        formData.append('key','test/' + file.name);
        formData.append('acl','private');
        formData.append('Content-Type','image/jpeg');
        formData.append('x-amz-meta-uuid','14365123651274');
        //Put in your access key here
        formData.append('X-Amz-Credential','AKIAJZ4R7CL6N5YVPIFA/'+this.buildTimestamp()+'/eu-central-1/s3/aws4_request');

        formData.append('X-Amz-Algorithm','AWS4-HMAC-SHA256');
        formData.append('X-Amz-Date',this.buildTimestamp()+'T000000Z');
        formData.append('x-amz-meta-tag','');
        formData.append('Policy',this.policy);
        formData.append('X-Amz-Signature',this.s3signature);
        formData.append('file',this.file);
*/
       // xhr.open('POST',myGlobals.GOLFCOURSE_URL,true);
        //xhr.send(formdata);
/*
function mobileuploadingCode(){
var formdata = new FormData();
var filename = makeid();

formdata.append('movie', {uri: videoUri, name: filename, type: 'video/mp4'});

formdata.append('site', 1);
formdata.append('user', 1);

formdata.append('name', name);
formdata.append('description', description);
formdata.append('longitude', longitude);
formdata.append('latitude', latitude);

var API_URL = 'http://test.golfskiworld.com/admin/api';

fetch(API_URL + '/adventure/destination', 
{
 headers: {
  'Accept': 'application/json',
  'Content-Type': 'multipart/form-data',
 },
 method: "POST",
 body: formdata
})
.then(function(response) {
 console.log("response: " + JSON.stringify(response));

 if (response.status != 200)
  alert('Upload failed', JSON.stringify(response));
 else
  alert('Upload succeed','You adventure has been uploaded successfully');
});
}*/


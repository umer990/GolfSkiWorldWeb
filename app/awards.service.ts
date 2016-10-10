import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import myGlobals = require('./constants');

@Injectable()
export class UploadService{
    constructor(private http: Http){ }
    /*
    This does nothing more than fetching the policy and signature from a node backend
    Check this for more info:
    http://stackoverflow.com/questions/18476217/amazon-s3-post-api-and-signing-a-policy-with-nodejs
     */
    getPolicy(directory){
        console.log('fetching Policy and Signature');
        let params = JSON.stringify({directory: directory});
        let headers = new Headers();

        headers.append('Content-Type','application/json');
        return this.http.post(myGlobals.GOLFCOURSE_URL,
        params,
            {
                headers: headers
            })
            .map(response => response.json());

    }
}
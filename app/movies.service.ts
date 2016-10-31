import { Injectable,ElementRef,OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable , map}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/Rx'
import myGlobals = require('./constants');

@Injectable()

export class movieService{

constructor (private http: Http) {}

getMovies(): Observable<Response>{ 
             return this.http.get(myGlobals.Destination)
                        .map(this.extractData)
                        .catch(this.handleError);
}
	

private extractData(res: Response) {
        let body = res.json();
        return body["destinations"] || { };
}

private handleError (error: any) {
            // In a real world app, we might use a remote logging infrastructure
            // We'd also dig deeper into the error to get a better message
            let errMsg = (error.message) ? error.message :
              error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error("Error:"+errMsg); // log to console instead
            return Observable.throw(errMsg);
}
}
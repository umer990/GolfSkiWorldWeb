import {Injectable} from '@angular/core';
import {Observable}from 'rxjs/Observable';
import {Http,Response}from '@angular/http';
import 'rxjs/Rx';


import myGlobals = require('./constants');




@Injectable()
export class DealsService1{
    constructor(private http: Http){ }

getLastMinutes(): Observable < any > {
    return this.http.get(myGlobals.LASTMINUTES_URL)
      .map(this.lastMinutes)
      .catch(this.handleError);
  }

  getDeals(): Observable < any > {
    return this.http.get(myGlobals.LASTMINUTES_URL)
      .map(this.deals)
      .catch(this.handleError);
  }

private deals(res: Response) {
    console.log(res);
    let body = res.json();
    return body['deals'] || {};
  }

 private lastMinutes(res: Response) {
    console.log(res);
    let body = res.json();
    return body['lastminutes'] || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
    
}



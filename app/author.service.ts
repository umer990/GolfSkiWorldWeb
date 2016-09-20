import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx'

@Injectable()
	

export class AuthorsService{

	constructor (private http: Http) {}
	
	


	private this.movieName=	"Silicon Valley"
	private this.movieUrl =	"https://www.omdbapi.com/?t="+this.movieName+"&Season=1"
	private this.data     =	["AuthNew1","AuthNew2","AuthNew3"];
	privete this.movies;
	
	

	getAuthors(): string[]{

				 return (this.data);//rest call or call something
	}
	
	getAuthors1(id): string[]{
			
	 		return(this.data[id])
	 }
	 
	 getAuthorsInsert(AuthorNew): string[]{
			this.data.push(AuthorNew)
	 		
	 }
	 getTime(): string[]{
		return this.http.get(this.movieUrl)
		.map(res=>res.json())
		.catch(this.handleError);
	}
	 getMovies(): string[]{
	 	 return this.http.get(this.movieUrl)
                    .map(this.extractData)
                    .catch(this.handleError);

                   
	 }
	
	 private extractData(res: Response) {
	    let body = res.json(); console.log(body.data)
	    return body["Title"] || { };
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




import {Component} from 'angular2/core'
import {AuthorsService} from './author.service'
import { Http, Response } from 'angular2/http';
import { Observable }     from 'rxjs/Observable';

import { operator }     from 'rxjs/operator';
import { HttpModule, JsonpModule } from 'angular2/http';
import { map }  from 'rxjs/add/operator/map';

@Component({
	selector:'authors',
	template:`
	<h2>authors</h2>
	{{title}}
	<h2>Get Json Time</h2>
	<button (click)="onTestGet()">Get Time</button>
	<p>{{getData}}</p>
	<h2>Get Json Movies</h2>
	<button (click)="onMoviesGet()">Get Movies</button>
	<p>{{movies}}</p>
	<ul>
	<li *ngFor="#author of authors">
	{{author}}

	</li>
	</ul>
	{{authorNew}}
	<ul>
	<li *ngFor="#author of authors">
	{{author}}

	</li>
	</ul>
	{{authors[0]}}
	`,
	providers:[AuthorsService]
	
})

export class AuthorsComponent{ 
	getData;
	title="Its title course ";

	authorNew;
	movies;
	authors;
	authorAdded;
	
	constructor(private authorsService: AuthorsService){
		
		this.authors=authorsService.getAuthors();
		
		

		this.authorNew=authorsService.getAuthors1(1);
		authorsService.getAuthorsInsert("AuthorInserted");
		this.authorAdded=authorsService.getAuthors();
		console.log(this.movies)

	}

	some(data1){
				//  console.log(body.data)
				let body = data1.json(); console.log(body.data)
	    		return body.data || { };
	    		
							    }

	onTestGet(){
		this.authorsService.getTime()
			.subscribe(
					data=>this.getData=JSON.stringify(data),
					error=>alert(error),
				()=>console.log("Date get finished")
				);
				}
				
	onMoviesGet(){
	this.authorsService.getMovies()
			.subscribe(
					data=>this.movies=JSON.stringify(data),
					error=>alert(error),
				()=>console.log("Date get finished")
				);
		
		}

}

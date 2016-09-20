import {Component} from 'angular2/core'
import {AuthorsService} from './author.service'

@Component({
    selector:'movies',
    template:`
      <h2>Movies</h2>
      
      
      {{authorNew}}
      <ul>
      <li *ngFor="#author of movies">
      {{author}}

      </li>
      </ul>
      {{movies[0]}}
      `,
    providers:[AuthorsService]
})


export class MoviesListComponent implements OnInit {
  errorMessage: string;
  movies;
  mode = 'Observable';
  constructor (private authorService: AuthorsService) {}
  ngOnInit() { this.getMovies(); }
  getMovies() {
    this.authorService.getMovies()
                     .subscribe(
                       movies => this.movies = movies,
                       error =>  this.errorMessage = <any>error);
  }
 
}
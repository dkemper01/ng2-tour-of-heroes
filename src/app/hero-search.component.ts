import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { HeroSearchService } from './hero-search-service';
import { Hero } from './hero';

@Component({
		providers: [HeroSearchService], // is this required, or is it enough that this provider already exists in the app.module.ts?
    selector: 'hero-search',
    templateUrl: 'hero-search.component.html',
		styleUrls: [ 'hero-search.component.css' ]
})

export class HeroSearchComponent implements OnInit {
	heroes: Observable<Hero[]>;
	private searchTerms = new Subject<string>();
	
ngOnInit(): void {
	this.heroes = this.searchTerms
		.debounceTime(300)
		.switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
		.catch(error => { 
			console.log(error); 
			return Observable.of<Hero[]>([]); 
		});
								
}
	
	constructor(private heroSearchService: HeroSearchService, private router: Router)
	{
		
	}
	
	/** 
	@method search
	A Subject is a producer of an observable event stream; searchTerms produces an Observable of strings, the filter criteria for the name search.
	**/
	search(term: string): void {
		// Push a search term into the observable stream by calling `next`.
		this.searchTerms.next(term);
	}
	
	gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}

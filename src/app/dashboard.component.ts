import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero-service';

@Component({
	selector: 'hero-dashboard',
	styleUrls: [ 'dashboard.component.css' ],
	templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
	
	hero: Hero;
	heroes: Array<Hero>;
	heroSvc: HeroService;
	
constructor(private router: Router, private heroService: HeroService) {
		this.heroSvc = heroService;	
	}
	
	ngOnInit() : void {
		this.heroSvc.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
	}
	
	/**
	@method goToDetail
	* Sets a route link parameters array using information from the hero paramter, and navigates 
	* to that hero's detail page.  The two array items align with the path and :id token in the
	* parameterized hero detail route definition in app.routing.ts.
	* @param {Hero} hero The Hero object
	*/
	public gotoDetail(hero: Hero): void {
		let link = ['/detail', hero.id];
  	this.router.navigate(link);
	}
}
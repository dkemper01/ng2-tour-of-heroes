import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { HeroService } from './hero-service';
import { Hero } from './hero';


@Component({
  selector: 'hero-detail',
	styleUrls: [ 'hero-detail.component.css' ],
	templateUrl: 'hero-detail.component.html'
})

export class HeroDetailComponent implements OnInit {
	
	@Input()
	hero: Hero;
	
	constructor(private heroService: HeroService, 
		private route: ActivatedRoute,
		private location: Location) {}
	
	ngOnInit(): void {
		
		// This causes all sorts of problems ...
		// const observableId: Observable<string> = this.route.params.map(p => p.id);
		//
		this.route.params.forEach((params: Params) => {
			let id = +params['id'];
			this.heroService.getHero(id)
				.then(hero => this.hero = hero);
		});
	}
	
	goBack(): void { this.location.back(); }
	
	save(): void {
		this.heroService.update(this.hero).then(() => {this.goBack();});
	}
		
}

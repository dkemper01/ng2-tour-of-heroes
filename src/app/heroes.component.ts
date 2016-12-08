import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero-service';

interface CustomStringMap extends DOMStringMap {
	isDeleting: string;
}

interface SelectEventTarget extends HTMLElement {
	localName: string;
	textContent: string;
	dataset: CustomStringMap;
	parentElement: SelectEventTarget;
}

interface SelectEvent extends Event {
	target : SelectEventTarget;
}

// The HeroesComponent knows which hero to show: the hero that the user selected from the list. 
// The user's selection is in its selectedHero property.	We update the AppComponent template so 
// that it binds its selectedHero property to the hero property of our HeroDetailComponent. The binding looks like this:
//		<hero-detail [hero]="selectedHero"></hero-detail>
// Notice that the hero property is the *target* of a property binding — it's in square brackets to the left of the (=). 
//		
@Component({
		providers: [HeroService], // is this required, or is it enough that this provider already exists in the app.module.ts?
    selector: 'my-heroes',
    templateUrl: 'heroes.component.html',
		styleUrls: [ 'heroes.component.css' ]
})

export class HeroesComponent implements OnInit{ 

	selectedHero: Hero;
	heroes: Array<Hero>;
	heroSvc: HeroService;
	router: Router;
	timelineCollection: Array<HeroDeleteTimeline>;
	
	ngOnInit(): void {
		this.getHeroes();
  }
	
	constructor(private routerService: Router, private heroService: HeroService) {
		this.heroSvc = heroService;	
		this.router = routerService;
		this.timelineCollection = new Array<HeroDeleteTimeline>();
	}
	
	public add(name: string): void {
		name = name.trim();
		
		if (!name) { return; }
		
		this.heroService.create(name)
			.then(hero => {
				this.heroes.push(hero);
				this.selectedHero = null;
			});
	}
	
	public onSelect(event: SelectEvent, hero: Hero) {

		this.selectedHero = hero;
		
		if ((event.target.localName === "div") && (event.target.textContent === "Delete")) {	
			this.heroService.delete(hero.id).then(() => {				
				this.heroes = this.heroes.filter(h => h !== hero);
				
        if (this.selectedHero === hero) { 
					this.selectedHero = null; 
				}
			});
		} else if (event.target.dataset.isDeleting) {
			
			this.timelineCollection.forEach(function(n) {				
				if (n.hero === hero) {
					n.timeline.reverse(0);
					delete event.target.dataset.isDeleting;
				}
			});
		}
	}
	
public onDeleteInitial(event: SelectEvent, hero: Hero) {		
		
		let timelineKeyValuePair = new HeroDeleteTimeline();
		var deleteTimeline = new TimelineLite();
		var parentElement = event.target.parentElement;
		
		deleteTimeline.to(event.target, 0, {autoAlpha: 0, fontSize: "0.80em" });
		deleteTimeline.to(parentElement, 0.5, { right: "0em", backgroundColor: "#ff4081", ease: Cubic.easeIn });
		deleteTimeline.to(event.target, 0.5, { autoAlpha: 1, textContent: "Delete", x: 7 });
		deleteTimeline.play();
		
		timelineKeyValuePair.hero = hero;
		timelineKeyValuePair.timeline = deleteTimeline;
		parentElement.parentElement.dataset.isDeleting = "true";
	
		this.timelineCollection.push(timelineKeyValuePair);
	}
	
	public getHeroes():void {
		this.heroSvc.getHeroes().then((heroes: Array<Hero>) => { this.heroes = heroes });
	}
	
	public goToDetail():void {
		this.routerService.navigate(['/detail', this.selectedHero.id]);
	}
}

class HeroDeleteTimeline {
	hero: Hero;
	timeline: Timeline;
}
	

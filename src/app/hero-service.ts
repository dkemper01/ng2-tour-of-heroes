import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { HEROES as Heroes } from './heroes';

@Injectable()
export class HeroService {
	
	private headers = new Headers({'Content-Type': 'application/json'});
	private heroesUrl = 'app/heroes';
	heroes: Array<Hero>;
	
	constructor(private http: Http) {
		this.heroes = Heroes;
	}
	
	public create(name: string): Promise<Hero> {
			return this.http
				.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
				.toPromise()
				.then(res => res.json().data)
				.catch(this.handleError)
	}
	
	public getHero(id: number): Promise<Hero> {
  return this.getHeroes()
             .then(heroes => heroes.find(hero => hero.id === id));
	}
	
	public getHeroes(): Promise<Hero[]> {
		
		// The Angular http.get returns an RxJS Observable.  We convert it to a promise.  
		// 
    return this.http.get(this.heroesUrl)
               .toPromise()
		// In the promise's `then` callback we call the json method of the HTTP Response 
		// to extract the data within the response.
		//
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
	}
	
	public update(hero: Hero): Promise<Hero> {
		const url = `${this.heroesUrl}/${hero.id}`;
		
		return this.http
			.put(url, JSON.stringify(hero), { headers: this.headers })
			.toPromise()
			.then(() => hero)
			.catch(this.handleError);
	}
	
	public delete(id: number): Promise<void> {
		const url = `${this.heroesUrl}/${id}`;
		
		return this.http.delete(url, {headers: this.headers})
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);

	}
	
}
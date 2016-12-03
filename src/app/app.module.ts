import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

// App - specific components
import { AppComponent }  from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroService } from './hero-service';
import { HeroSearchComponent }  from './hero-search.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		InMemoryWebApiModule.forRoot(InMemoryDataService),
		routing
	],
	declarations: [
		AppComponent,
		DashboardComponent,
		HeroDetailComponent,
		HeroesComponent,
		HeroSearchComponent
	],
	providers: [ HeroService ],
	bootstrap: [ AppComponent ]
	})

export class AppModule { }

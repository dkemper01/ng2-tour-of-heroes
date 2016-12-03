// Step 1: create app.routing.ts, and define your routes array.  // 
// 
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent }      from './heroes.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroDetailComponent } 	from './hero-detail.component';

const appRoutes: Routes = [
	{
		path: 'heroes',
		component: HeroesComponent
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'detail/:id',
		component: HeroDetailComponent
	},
	// A redirect route for the index.
	//
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	}
];

// Step 2: export a routing constant initialized using the RouterModule.forRoot method applied to our array of routes. 
// This method returns a configured router module that we'll add to our root NgModule, AppModule.
//
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
//
// We call the forRoot method because we're providing a configured router at the root of the application. 
// The forRoot method gives us the Router service providers and directives needed for routing.
//


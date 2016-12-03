import { Component } from '@angular/core';

/* The application's router component
*/
@Component({
    selector: 'app-root',
		styleUrls: [ 'app.component.css' ],
    template: `
	   <div class="container">
			 <div class="row">
				<div class="col-lg-12">
					<div class="page-header">
						<h1>{{title}}</h1>
						<button routerLink="/dashboard" class="btn btn-default">Dashboard</button>
						<button routerLink="/heroes" class="btn btn-default">Heroes</button>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<router-outlet></router-outlet>
				</div>
			</div>			
		</div>
		`
})

export class AppComponent {
	title: string = 'Tour of Heroes';
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';

import { filter } from 'rxjs/operators';
import { DatabaseService } from "./service/sqlite/sqlite.service";
import { LoginService } from './service/login.service';
import * as app from 'tns-core-modules/application';
const firebase = require('nativescript-plugin-firebase');
import { registerElement } from 'nativescript-angular/element-registry';
registerElement('Fab', () => require('nativescript-floatingactionbutton').Fab);

@Component({
	moduleId: module.id,
	selector: 'ns-app',
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
	private _activatedUrl: string;
	private _sideDrawerTransition: DrawerTransitionBase;

	constructor(private loginService: LoginService, private database: DatabaseService, private router: Router, private routerExtensions: RouterExtensions) {
		// Use the component constructor to inject services.



	}

	ngOnInit(): void {
		this._activatedUrl = '/dashboard';
		this._sideDrawerTransition = new SlideInOnTopTransition();

		this.router.events
			.pipe(filter((event: any) => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => (this._activatedUrl = event.urlAfterRedirects));

		

		this.database.getdbConnection()
		.then(db => {
			db.execSQL("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)").then(() => {
			}, error => {
				console.log("CREATE TABLE ERROR", error);
			});

			db.execSQL("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT UNIQUE, password TEXT)").then(() => {
			}, error => {
				console.log("CREATE TABLE ERROR", error);
			});

			db.execSQL("CREATE TABLE IF NOT EXISTS contacts (id TEXT, firstName TEXT, lastName TEXT, age INTEGER)").then(() => {
			}, error => {
				console.log("CREATE TABLE ERROR", error);
			});

		});

		firebase
			.init(
				{
					// Optionally pass in properties for database, authentication and cloud messaging,
					// see their respective docs.
				}
			)
			.then(
				() => {
					console.log('firebase.init done');

					const citiesCollection = firebase.firestore.collection('users');

					citiesCollection.get().then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
						});
					});
				},
				(error) => {
					console.log(`firebase.init error: ${error}`);
				}
			);
	}

	get sideDrawerTransition(): DrawerTransitionBase {
		return this._sideDrawerTransition;
	}

	isComponentSelected(url: string): boolean {
		return this._activatedUrl === url;
	}

	get drawerEnabled(): boolean {
		let enabled = this._activatedUrl === '/login'? false : true;
		return false;
	}

	onNavItemTap(navItemRoute: string): void {
		this.routerExtensions.navigate([ navItemRoute ], {
			transition: {
				name: 'fade'
			}
		});

		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.closeDrawer();
	}

	logout() {
		this.loginService.logout();
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.closeDrawer();
		this.routerExtensions.navigate([ '/login' ], {
			transition: {
				name: 'fade'
			}
		});
	}
}

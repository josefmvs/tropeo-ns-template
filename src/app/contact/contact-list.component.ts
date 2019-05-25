import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { Store, select } from '@ngrx/store';
import { ItemState } from './../states/item.state';
import * as itemActions from './../actions/item.actions';
import * as fromItems from './../reducers/item.reducer';
import { RouterExtensions } from 'nativescript-angular/router';
// import { todo } from

@Component({
	selector: 'ContactList',
	moduleId: module.id,
	templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {
	constructor(private _routerExtensions: RouterExtensions, private store: Store<ItemState>) {
		// Use the component constructor to inject providers.
	}

	ngOnInit(): void {}

	onDrawerButtonTap(): void {
		console.log();

		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

	add(): void {
		console.log('add button pressed');
		this._routerExtensions.navigate([ 'contact/contact-add' ], {
			animated: true,
			transition: {
				name: 'slide',
				duration: 200,
				curve: 'ease'
			}
		});
	}
}

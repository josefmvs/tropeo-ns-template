import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { Store, select } from '@ngrx/store';
import { ItemState } from './../states/item.state';
import * as itemActions from './../actions/item.actions';
import * as fromItems from './../reducers/item.reducer';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
	selector: 'ContactAdd',
	moduleId: module.id,
	templateUrl: './contact-add.component.html'
})
export class ContactAddComponent implements OnInit {
	constructor(private _routerExtensions: RouterExtensions, private store: Store<ItemState>) {
		// Use the component constructor to inject providers.
	}

	ngOnInit(): void {}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

	onBackButtonTap(): void {
		this._routerExtensions.backToPreviousPage();
	}
}

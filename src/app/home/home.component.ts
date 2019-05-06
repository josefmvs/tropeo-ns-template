import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { Store, select } from '@ngrx/store';
import { ItemState } from './../states/item.state';
import * as itemActions from './../actions/item.actions';
import * as fromItems from './../reducers/item.reducer';

@Component({
	selector: 'Home',
	moduleId: module.id,
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
	public showLabel: boolean;
	public firstSwitchState = 'OFF';
	public secondSwitchState = 'ON';

	constructor(private store: Store<ItemState>) {
		// Use the component constructor to inject providers.
	}

	ngOnInit(): void {
		// Init your component properties here.
		this.store.pipe(select(fromItems.getShowLabel)).subscribe((showLabel) => {
			this.showLabel = showLabel;
		});
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

	onSwitchChecked(args) {
		this.store.dispatch(new itemActions.ToggleItemLabel(args.object.checked));
	}
}

import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { Button } from 'tns-core-modules/ui/button';
import { Store, select } from '@ngrx/store';
import { DashboardState } from './../states/dashboard.state';
import * as dashboardActions from './../actions/dashboard.actions';
import * as fromItems from './../reducers/dashboard.reducer';
//import { OnTabSelectedEventData, BubbleNavigationItem } from 'nativescript-custom-bottomsheet';
import { Page, View } from 'tns-core-modules/ui/page';
import { SegmentedBar, SegmentedBarItem } from 'tns-core-modules/ui/segmented-bar';
import { RouterExtensions } from 'nativescript-angular/router';

export class DataItem {
	constructor(public itemDesc: string) {}
}

@Component({
	selector: 'Dashboard',
	moduleId: module.id,
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
	size = [ this.random(), this.random(), this.random() ];
	progress = [ this.random(0, 100), this.random(0, 100), this.random(0, 100) ];
	data = [];
	data2 = [];
	data3 = [];
	glyphs = [];

	segmentItems: Array<SegmentedBarItem>;
	selectedIndex = 0;
	//private customBottomsheet: CustomBottomsheet;

	public items: Array<DataItem>;

	constructor(private _routerExtensions: RouterExtensions, private page: Page, private store: Store<DashboardState>) {
		this.items = new Array<DataItem>();
		for (let i = 0; i < 5; i++) {
			this.items.push(new DataItem('item ' + i));
		}

		for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
			let glyph = {
				icon: String.fromCharCode(charCode),
				code: charCode.toString(16)
			};
			this.glyphs.push(glyph);
		}

		this.segmentItems = [];
		for (let i = 1; i < 4; i++) {
			let segmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
			segmentedBarItem.title = 'View ' + i;
			this.segmentItems.push(segmentedBarItem);
		}
	}

	onSelectedIndexChange(args) {
		let segmentedBar = <SegmentedBar>args.object;
		this.selectedIndex = segmentedBar.selectedIndex;
	}

	ngOnInit(): void {
		// Init your component properties here.

		this.data.push({
			text: 'Bulbasaur',
			src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
		});
		this.data.push({
			text: 'Ivysaur',
			src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'
		});
		this.data.push({
			text: 'Venusaur',
			src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'
		});
		this.data.push({
			text: 'Charmander',
			src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
		});
		this.data.push({
			text: 'Charmeleon',
			src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png'
		});

		this.data2.push({
			text: 'Bulbasaur2',
			src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
		});
		this.data2.push({
			text: 'Ivysaur2',
			src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'
		});
		this.data2.push({
			text: 'Venusaur2',
			src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'
		});

		this.data3 = this.data;

		this.store.dispatch(new dashboardActions.LoadingActivities(true));
	}

	buttonLoaded() {
		console.log('button loaded');
		// let testButton: View = this.page.getViewById('dashboard-fab');
		// testButton
		// 	.animate({
		// 		scale: { x: 0, y: 1 },
		// 		duration: 3000
		// 	})
		// 	.then(() => {
		// 		// let testButton = this.page.getViewById('dashboard-fab');
		// 		// testButton.visibility = 'collapse';
		// 	});
	}

	add(): void {
		console.log('add button pressed');
		this._routerExtensions.navigate([ 'contact/contact-edit' ], {
			animated: true,
			transition: {
				name: 'slide',
				duration: 200,
				curve: 'ease'
			}
		});
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

	random(min = 50, max = 150) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	onItemTap(args) {
		console.log('You tapped: 3' + this.data[args.index].text);
	}

	onTap(args) {
		let button = <Button>args.object;
		console.log('On tap2: ' + button.text);
		switch (button.text) {
			case 'All':
				this.data3 = this.data;
				this.store.dispatch(new dashboardActions.ToggleItemLabel1(true));
				break;
			case 'Favorites':
				this.data3 = this.data2;
				this.store.dispatch(new dashboardActions.ToggleItemLabel1(true));
				break;
			default:
				this.data3 = this.data;
		}
	}
}

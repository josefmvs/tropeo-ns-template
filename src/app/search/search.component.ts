import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
const firebase = require('nativescript-plugin-firebase');

@Component({
	selector: 'Search',
	moduleId: module.id,
	templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

	glyphs = [];

	constructor() {
		// Use the component constructor to inject providers.
	}

	ngOnInit(): void {
		// Init your component properties here.

		const citiesCollection = firebase.firestore.collection('users');

		citiesCollection.get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
			});
		});

		for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
			let glyph = {
				icon: String.fromCharCode(charCode),
				code: charCode.toString(16)
			};
			this.glyphs.push(glyph);
		}

	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}
}

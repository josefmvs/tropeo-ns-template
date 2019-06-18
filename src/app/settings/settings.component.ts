import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { action } from 'tns-core-modules/ui/dialogs';

@Component({
	selector: 'Settings',
	moduleId: module.id,
	templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
	constructor() {
		// Use the component constructor to inject providers.
	}

	displayActionDialog() {
		// >> action-dialog-code
		let options = {
			title: 'Race selection',
			message: 'Choose your race',
			cancelButtonText: 'Cancel',
			actions: [ 'Human', 'Elf', 'Dwarf', 'Orc', 'Unicorn' ]
		};

		action(options).then((result) => {
			console.log(result);
		});
		// << action-dialog-code
	}

	ngOnInit(): void {
		// Init your component properties here.
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}
}

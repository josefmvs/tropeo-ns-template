import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { ContactAddComponent } from './contact-add.component';
import { ContactEditComponent } from './contact-edit.component';
import { ContactListComponent } from './contact-list.component';

const routes: Routes = [
	{ path: '', component: ContactListComponent },
	{ path: 'contact-add', component: ContactAddComponent },
	{ path: 'contact-edit', component: ContactEditComponent },
	{ path: 'contact-list', component: ContactListComponent }
];

@NgModule({
	imports: [ NativeScriptRouterModule.forChild(routes) ],
	exports: [ NativeScriptRouterModule ]
})
export class ContactRoutingModule {}

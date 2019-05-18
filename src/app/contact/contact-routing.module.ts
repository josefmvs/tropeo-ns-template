import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { ContactAddComponent } from './contact-add.component';
import { ContactEditComponent } from './contact-edit.component';

const routes: Routes = [
	{ path: '', component: ContactAddComponent },
	{ path: 'contact-edit', component: ContactEditComponent }
];

@NgModule({
	imports: [ NativeScriptRouterModule.forChild(routes) ],
	exports: [ NativeScriptRouterModule ]
})
export class ContactRoutingModule {}

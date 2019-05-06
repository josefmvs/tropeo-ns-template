import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from './browse.component';
import { StoreModule } from '@ngrx/store';
import { itemReducer } from '../reducers/item.reducer';

@NgModule({
	imports: [ NativeScriptCommonModule, BrowseRoutingModule, StoreModule.forFeature('items', itemReducer) ],
	declarations: [ BrowseComponent ],
	schemas: [ NO_ERRORS_SCHEMA ]
})
export class BrowseModule {}

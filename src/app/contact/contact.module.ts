import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactAddComponent } from './contact-add.component';
import { StoreModule } from '@ngrx/store';
import { itemReducer } from '../reducers/item.reducer';

@NgModule({
	imports: [ NativeScriptCommonModule, ContactRoutingModule, StoreModule.forFeature('items', itemReducer) ],
	declarations: [ ContactAddComponent ],
	schemas: [ NO_ERRORS_SCHEMA ]
})
export class ContactModule {}

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { NativeScriptFormsModule  } from "nativescript-angular/forms";
import { LISTVIEW_DIRECTIVES, NativeScriptUIListViewModule  } from "nativescript-ui-listview/angular";
import { ReactiveFormsModule  } from '@angular/forms';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactAddComponent } from './contact-add.component';
import { ContactEditComponent } from './contact-edit.component';
import { ContactListComponent } from './contact-list.component';
import { StoreModule } from '@ngrx/store';
import { todoReducers } from '../reducers/todo.reducer';
import { itemReducer } from '../reducers/item.reducer';
import { contactReducers } from '../reducers/contact.reducer';
import { ContactEffects } from '../effects/contact.effects';  

@NgModule({
	imports: [ EffectsModule.forFeature([ContactEffects]), NativeScriptUIDataFormModule, ReactiveFormsModule, NativeScriptFormsModule, NativeScriptCommonModule, ContactRoutingModule,  StoreModule.forFeature('contacts', contactReducers) ],
	declarations: [LISTVIEW_DIRECTIVES, ContactAddComponent, ContactEditComponent, ContactListComponent ],
	schemas: [ NO_ERRORS_SCHEMA ]
})
export class ContactModule {}

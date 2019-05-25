import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
// import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';
import { SharedModule } from './service/shared.module'; //'../services/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [  SharedModule.forRoot(), AppRoutingModule, NativeScriptModule, NativeScriptUISideDrawerModule, StoreModule.forRoot({}) ],
	declarations: [ AppComponent ],
	schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {}

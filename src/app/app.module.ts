import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { EffectsModule } from '@ngrx/effects';
// import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';
import { SharedModule } from './service/shared.module'; //'../services/shared.module';
import { ContactEffects } from './effects/contact.effects';
import { authProviders, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LoginModule } from "./login/login.module";
import { LoginService } from "./service/login.service";

@NgModule({
	bootstrap: [ AppComponent ],
	providers: [
        authProviders,
		LoginService
    ],
	imports: [EffectsModule.forRoot([ContactEffects]), LoginModule, SharedModule.forRoot(), AppRoutingModule, NativeScriptModule, NativeScriptUISideDrawerModule, StoreModule.forRoot({}) ],
	declarations: [ AppComponent ],
	schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {}

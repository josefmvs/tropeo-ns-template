import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CircularProgressBarComponent } from './circular-progress.component';
import { StoreModule } from '@ngrx/store';
import { dashboardReducer } from '../reducers/dashboard.reducer';

@NgModule({
	imports: [
		NativeScriptCommonModule,
		DashboardRoutingModule,
		StoreModule.forFeature('activities', dashboardReducer)
	],
	declarations: [ DashboardComponent, CircularProgressBarComponent ],
	schemas: [ NO_ERRORS_SCHEMA ]
})
export class DashboardModule {}

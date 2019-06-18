import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { AuthGuard } from "./../service/auth-guard.service";
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [ { path: '', component: DashboardComponent,  canActivate: [AuthGuard] } ];

@NgModule({
	imports: [ NativeScriptRouterModule.forChild(routes) ],
	exports: [ NativeScriptRouterModule ]
})
export class DashboardRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AuthGuard } from "./../service/auth-guard.service";
import { SettingsComponent } from "./settings.component";

const routes: Routes = [
    { path: "", component: SettingsComponent,  canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SettingsRoutingModule { }

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AuthGuard } from "./../service/auth-guard.service";
import { ContactAddComponent } from "./contact-add.component";
import { ContactEditComponent } from "./contact-edit.component";
import { ContactListComponent } from "./contact-list.component";

const routes: Routes = [
    { path: "", component: ContactListComponent, canActivate: [AuthGuard] },
    {
        path: "contact-add",
        component: ContactAddComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "contact-edit/:id",
        component: ContactEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "contact-list",
        component: ContactListComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ContactRoutingModule {}

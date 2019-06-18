import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Store, select } from "@ngrx/store";
import { ItemState } from "./../states/item.state";
import * as itemActions from "./../actions/item.actions";
import * as fromItems from "./../reducers/item.reducer";
import { RouterExtensions } from "nativescript-angular/router";
import { ItemActions } from "../actions/item.actions";
import { ActivatedRoute } from "@angular/router";
import { Contact } from "./../models/contact.model";
import { ContactService } from "./../service/contact.service";
import { ContactState } from "./../states/contact.state";

@Component({
    selector: "ContactEdit",
    moduleId: module.id,
    templateUrl: "./contact-edit.component.html"
})
export class ContactEditComponent implements OnInit {
    private _conctactId;
    contact: Contact;
    constructor(
        private route: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private store: Store<ItemState>,
        private contactService: ContactService
    ) {
        this._conctactId = this.route.params["value"].id;
    }

    ngOnInit(): void {
        this.getContact();
    }

    getContact() {
        this.contactService.getContact(this._conctactId);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }
}

import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { Store, select } from "@ngrx/store";
// import { Todo } from './../models/todo.model';
// import { TodoService } from './../service/todo.service';
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { View } from "tns-core-modules/ui/core/view";
import { Contact } from "./../models/contact.model";
import { ContactService } from "./../service/contact.service";
import { Observable } from "rxjs";
import { ContactState } from "./../states/contact.state";
import * as fromContactReducer from "./../reducers/contact.reducer";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { constructDependencies } from "@angular/core/src/di/reflective_provider";

@Component({
    selector: "ContactList",
    moduleId: module.id,
    templateUrl: "./contact-list.component.html",
    styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit {
    private contacts: Contact[] = [];
    private _contacts;
    @ViewChild("myListView") listViewComponent: RadListViewComponent;

    constructor(
        private zone: NgZone,
        private _routerExtensions: RouterExtensions,
        private store: Store<ContactState>,
        private contactService: ContactService
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this._contacts = this.contactService.entities();

        this._contacts.subscribe(contacts => {
            var len = contacts.length;
            this.contacts = [];
            this.contacts = contacts;
        });

        this.getContacts();
    }

    // >> angular-listview-swipe-action-release-notify
    public onCellSwiping(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var currentItemView = args.object;
        var currentView;

        if (args.data.x > 200) {
            console.log("Notify perform left action");
        } else if (args.data.x < -200) {
            console.log("Notify perform right action");
        }
    }

    public onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args["object"];
        //const leftItem = swipeView.getViewById<View>('mark-view');
        const rightItem = swipeView.getViewById<View>("delete-view");
        //swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        //swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    }
    // << angular-listview-swipe-action-release-limits
    // >> angular-listview-swipe-action-release-execute
    public onSwipeCellFinished(args: ListViewEventData) {}

    public onLeftSwipeClick(args: ListViewEventData) {
        console.log("Left swipe click");
        //this.listViewComponent.listView.notifySwipeToExecuteFinished();
    }

    public onRightSwipeClick(args) {
        console.log("Right swipe click");
        var itemSelected = args.object.bindingContext;
        this.deleteRecord(itemSelected.id);
        //this.contactList.indexOf(args.object.bindingContext);
        //this.contactList.splice(this.contactList.indexOf(args.object.bindingContext), 1);
    }

    get contactList(): Contact[] {
        return this.contacts;
    }

    public trackByToodFun(index, item) {
        return item.id;
    }

    onDrawerButtonTap(): void {
        console.log();

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    deleteRecord(id) {
        this.contactService.remove(id);
    }

    add(): void {
        console.log("add button pressed");
        this._routerExtensions.navigate(["contact/contact-add"], {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    }

    updateContact(id) {
        console.log("update contact: " + id);
        this._routerExtensions.navigate(["contact/contact-edit", id], {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    }

    getRemoveAllContacts() {
        this.contactService.dbRemoveAllContacts();
    }

    getContacts() {
        this.contactService.getContacts();
    }
}

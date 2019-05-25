import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { Store, select } from '@ngrx/store';
import { ItemState } from './../states/item.state';
import * as itemActions from './../actions/item.actions';
import * as fromItems from './../reducers/item.reducer';
import { RouterExtensions } from 'nativescript-angular/router';
import { Todo } from './../models/todo.model';
import { TodoService } from './../service/todo.service';
// import {RadDataForm} from 'nativescript-ui-dataform';

const personMetadata: any = {
  "isReadOnly": false,
  "commitMode": "Immediate",
  "validationMode": "Immediate",
  "propertyAnnotations":
  [
    {
      "name": "name",
      "displayName": "Name",
      "index": 1
    },
    {
      "name": "age",
      "displayName": "My Age",
      "index": 0,
      "editor": "Number"
    },
    {
      "name": "email",
      "displayName": "E-Mail",
      "index": 2,
      "editor": "Email"
    },
    {
      "name": "city",
      "displayName": "City",
      "index": 3,
      "editor": "Picker",
      "valuesProvider": ["New York", "Washington", "Los Angeles"]
    },
    {
      "name": "street",
      "displayName": "Street Name",
      "index": 4
    },
    {
      "name": "streetNumber",
      "displayName": "Street Num",
      "index": 5,
      "editor": "Number"
    },
    {
      "name": "nested",
      "displayName": "Nested",
      "index": 6,
      "ignore": true
    },
    {
      "name": "date",
      "displayName": "Date",
      "editor": "DatePicker",
      "index": 7
    },
    {
      "name": "time",
      "displayName": "Time Picker",
      "editor": "TimePicker",
      "index": 8
    }
  ]
}

class Person {
    public name: string;
    public age: number;
    public email: string;
    public city: string;
    public street: string;
    public streetNumber: number;

    constructor(name: string, age: number, email: string, city: string, street: string, streetNumber: number) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
    }
}

@Component({
	selector: 'ContactAdd',
	moduleId: module.id,
	templateUrl: './contact-add.component.html'
})
export class ContactAddComponent implements OnInit {

	public _todo = <Todo>{};
	private _person: Person;



	constructor(private _routerExtensions: RouterExtensions, private todoService:TodoService, private store: Store<ItemState>) {
		// Use the component constructor to inject providers.
	}

	ngOnInit() {
        this._todo = {'title': 'test', 'description': 'testdesc'}; //new Person("John", 23, "john@company.com", "New York", "5th Avenue", 11);
		 this._person = new Person("John", 23, "john@company.com", "New York", "5th Avenue", 11);
	
	}

	get person(): Person {
        return this._person;
    }

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

	onBackButtonTap(): void {
		this._routerExtensions.backToPreviousPage();
	}

	onSwitchChecked(args) {
		this.store.dispatch(new itemActions.ToggleItemLabel(args.object.checked));
	}

	get todo(): Todo {
        return this._todo;
    }

	// onSubmitAddForm(form) {
    //     //console.log('addRecords>>>>');
    //     // console.log(form);
    //     if(form.valid) {
    //         this.todoService.add(this._todo);
    //        // this.router.navigate(['/list']);
    //     } else {
    //         console.log('Form Invalid');
    //     }
    // }
}

import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Validators,AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import * as app from 'tns-core-modules/application';
import { Store, select } from '@ngrx/store';
import { RouterExtensions } from 'nativescript-angular/router';
// import { Todo } from './../models/todo.model';
// import { TodoService } from './../service/todo.service';
import { Observable } from 'rxjs';
// import {RadDataForm} from 'nativescript-ui-dataform';

import { Contact } from './../models/contact.model';
import { ContactService } from './../service/contact.service';

@Component({
	selector: 'ContactAdd',
	moduleId: module.id,
	templateUrl: './contact-add.component.html'
})
export class ContactAddComponent implements OnInit {
  firstName: AbstractControl;
  lastName: AbstractControl;
  age: AbstractControl;
  createContactForm: FormGroup; 
	public _contact = <Contact>{};
  public contactSub: Observable<Contact>;
  public contactSubtest = [1,2];

	constructor(private formBuilder:FormBuilder, private _routerExtensions: RouterExtensions, private contactService:ContactService) {
		  this.createContactForm = this.formBuilder.group({
            firstName: ["",Validators.required],
            lastName:["",Validators.required],
            age:["",Validators.required],
      });
	}

	ngOnInit() {
    //this.todoSub = this.todoService.list();
    //this._todo = {'title': 'test', 'description': 'testdesc'}; //new Person("John", 23, "john@company.com", "New York", "5th Avenue", 11);
    this.firstName = this.createContactForm.controls['firstName'];
    this.lastName = this.createContactForm.controls['lastName'];
    this.age = this.createContactForm.controls['age'];
	}

  onButtonTap(){
        let formvalues = this.createContactForm.value;
        //console.log(formvalues);
       
        this._contact.firstName = formvalues.firstName;
        this._contact.lastName = formvalues.lastName;
        this._contact.age = Number(formvalues.age) || 0; //+ formvalues.age;
         console.log(this._contact.firstName + ' ' + this._contact.lastName);
         this.contactService.add(this._contact);
         this._routerExtensions.backToPreviousPage();
  }

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

	onBackButtonTap(): void {
		this._routerExtensions.backToPreviousPage();
	}

	// onSwitchChecked(args) {
	// 	this.store.dispatch(new itemActions.ToggleItemLabel(args.object.checked));
	// }

	get contact(): Contact {
        return this._contact;
    }
    
}

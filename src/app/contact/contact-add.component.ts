import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Validators,AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import * as app from 'tns-core-modules/application';
import { Store, select } from '@ngrx/store';
// import { ItemState } from './../states/item.state';
// import * as itemActions from './../actions/item.actions';
// import * as fromItems from './../reducers/item.reducer';
import { RouterExtensions } from 'nativescript-angular/router';
import { Todo } from './../models/todo.model';
import { TodoService } from './../service/todo.service';
import { Observable } from 'rxjs';
// import {RadDataForm} from 'nativescript-ui-dataform';



@Component({
	selector: 'ContactAdd',
	moduleId: module.id,
	templateUrl: './contact-add.component.html'
})
export class ContactAddComponent implements OnInit {
  title: AbstractControl;
  desc: AbstractControl;
  signUpForm: FormGroup; 
	public _todo = <Todo>{};
  public todoSub: Observable<Todo>;
  public todoSubtest = [1,2];

	constructor(private formBuilder:FormBuilder, private _routerExtensions: RouterExtensions, private todoService:TodoService) {
		  this.signUpForm = this.formBuilder.group({
            title: ["",Validators.required],
            desc:["",Validators.required],
      });
	}

	ngOnInit() {
    this.todoSub = this.todoService.list();
    //this._todo = {'title': 'test', 'description': 'testdesc'}; //new Person("John", 23, "john@company.com", "New York", "5th Avenue", 11);
    this.title = this.signUpForm.controls['title'];
    this.desc = this.signUpForm.controls['desc'];
	}

  onButtonTap(){
        let formvalues = this.signUpForm.value;
        //console.log(formvalues);
       
        this._todo.title = formvalues.title;
        this._todo.description = formvalues.desc;
         console.log(this._todo.title + ' ' + this._todo.description);
         this.todoService.add(this.todo);
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

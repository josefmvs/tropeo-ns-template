import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { RouterExtensions } from 'nativescript-angular/router';
import { Todo } from './../models/todo.model';
import { TodoService } from './../service/todo.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'ContactList',
	moduleId: module.id,
	templateUrl: './contact-list.component.html',
	styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
	public todoSub: Observable<Todo>;
	public todoList : Todo;

	constructor(private _routerExtensions: RouterExtensions, private todoService:TodoService ) {
		// Use the component constructor to inject providers.
	}

	ngOnInit(): void {
		this.todoSub = this.todoService.list();
	}

	public trackByToodFun(index, item) {
      return item.id;
    }

	onDrawerButtonTap(): void {
		console.log();

		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

	add(): void {
		console.log('add button pressed');
		this._routerExtensions.navigate([ 'contact/contact-add' ], {
			animated: true,
			transition: {
				name: 'slide',
				duration: 200,
				curve: 'ease'
			}
		});
	}

	 deleteRecord(id) {
      this.todoService.remove(id);
    }
}

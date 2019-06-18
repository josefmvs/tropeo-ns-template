import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Todo } from './../models/todo.model';
export const ADD_TODO = '[TODO] Add';
export const REMOVE_TODO = '[TODO] Remove';
export const UPDATE_TODO = '[TODO] Update';

export class AddTodo implements Action {
	readonly type = ADD_TODO;

	constructor(public payload: Todo) {
		console.log('action todo add: ' + payload.title);

	}
}

export class UpdateTodo implements Action {
	readonly type = UPDATE_TODO;

	constructor(public id: number, public changes) {}
}

export class RemoveTodo implements Action {
	readonly type = REMOVE_TODO;

	constructor(public id: number) {}
}

export type Actions = AddTodo | UpdateTodo | RemoveTodo;

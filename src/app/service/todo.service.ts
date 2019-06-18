import { Injectable } from '@angular/core';
import {Observable,of, from } from 'rxjs';

import * as TodoActions from './../actions/todo.actions'

import * as fromTodoReducer from './../reducers/todo.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Store, select } from '@ngrx/store';
import { TodoState } from './../states/todo.state';
import { Todo } from './../models/todo.model'

@Injectable()
export class TodoService {

    private allTodos;
    private todoById;
    constructor (private store: Store<TodoState> ) {

      this.allTodos = createSelector(
        fromTodoReducer.selectAll,
        (entities) => {
          console.log("entities: " + JSON.stringify(entities));
          
          return entities;
        }
      )

      this.todoById = createSelector(fromTodoReducer.selectEntities,
        (entities: Dictionary<Todo>, props: {id: number}) => {
          return entities[props.id];
        }
      )

    }

    public add(data: Todo) {
      console.log('service todo add: ' + data.title);
      data.id = new Date().getTime();
      this.store.dispatch(new TodoActions.AddTodo(data) )
    }


    public list() {
      let list = this.store.pipe(select(this.allTodos));
      return list;
    }

    public remove(id: number) {
      this.store.dispatch(new TodoActions.RemoveTodo(id))
    }

    public getDetail(id: number) {
      return this.store.pipe(select(this.todoById, {id: id}));
    }

    public edit(id: number, changes: Todo) {
      this.store.dispatch(new TodoActions.UpdateTodo(id, changes))
    }
}

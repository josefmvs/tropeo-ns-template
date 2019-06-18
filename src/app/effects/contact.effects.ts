import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of, from, Observable } from "rxjs";
import {
    catchError,
    map,
    concat,
    concatMap,
    mapTo,
    mergeMap,
    merge,
    tap,
    switchMap
} from "rxjs/operators";
import { Contact } from "./../models/contact.model";
import { ContactService } from "./../service/contact.service";
import * as ContactActions from "./../actions/contact.actions";
import { Action, Store } from "@ngrx/store";
import { ContactState } from "./../states/contact.state";
//import * as ContactActions from './../actions/contact.actions';
@Injectable()
export class ContactEffects {
    constructor(
        private actions$: Actions, //,
        private contactService: ContactService,
        private store: Store<ContactState> //private contactActions: ContactActions
    ) {}

    // NOTE : WHEN EFFECTS RETURNS ACTION, YOU CAN'T BREAKPOINT IN ACTION BUT ON IT'S REDUCER

    @Effect()
    loadContacts: Observable<Action> = this.actions$.pipe(
        ofType(ContactActions.LOAD_CONTACTS),
        switchMap(action => this.contactService.dbGetContacts()),
        map((contacts: Contact[]) => {
            var _contacts = contacts;
            return { type: "[CONTACT] Load Success", payload: _contacts };
        }),
        catchError((err, caught) => {
            this.store.dispatch(new ContactActions.AddContactError());
            return caught;
        })
    );

    @Effect()
    getContact$ = this.actions$.pipe(
        ofType(ContactActions.GET_CONTACT),
        switchMap(action => this.contactService.dbGetContact(action["id"])),
        map(contact => {
            var _contact = contact;
            return {
                type: ContactActions.GET_CONTACT_SUCCESS,
                payload: _contact
            };
        }),
        catchError((err, caught) => {
            this.store.dispatch(new ContactActions.AddContactError());
            return caught;
        })
    );

    // NOTE : WHEN EFFECTS RETURNS ACTION, YOU CAN'T BREAKPOINT IN ACTION BUT ON IT'S REDUCER

    @Effect()
    addingContact: Observable<Action> = this.actions$.pipe(
        ofType("[CONTACT] Adding"),
        switchMap(action =>
            this.contactService.dbInsertContact(action["payload"])
        ),
        map(contact => ({ type: "[CONTACT] Add", payload: contact })),
        catchError((err, caught) => {
            this.store.dispatch(new ContactActions.AddContactError());
            return caught;
        })
    );

    @Effect()
    deleteContact$ = this.actions$.pipe(
        ofType(ContactActions.REMOVE_CONTACT),
        switchMap(action => this.contactService.dbRemoveContact(action["id"])),
        map(_id => ({ type: "[CONTACT] Remove Success", payload: _id })),
        catchError((err, caught) => {
            this.store.dispatch(new ContactActions.AddContactError());
            return caught;
        })
    );

    // @Effect({dispatch: false}) deleteContact$ = this.actions$.pipe(
    //     ofType(ContactActions.REMOVE_CONTACT),
    //     tap((contact) =>
    //         this.contactService.dbRemoveContact(contact['id'])
    //     )
    // );

    //     @Effect()
    //     updateContact$ = this.actions$
    //         .ofType('[CONTACT] Update')
    //         .map<Contact>(toPayload)
    //         .mergeMap(contact => console.log('db update contact') );

    // //this.db.update(birthday)
    //     @Effect()
    //     deleteContact$ = this.actions$
    //         .ofType('[CONTACT] Remove')
    //         .map<Contact>(toPayload)
    //         .mergeMap(contact => console.log('db remove contact'));
    //         // this.db.delete(birthday
}

import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Contact } from "./../models/contact.model";

export const LOAD_CONTACTS = "[CONTACT] Load Contacts";
export const LOAD_CONTACTS_SUCCESS = "[CONTACT] Load Success";
export const ADD_CONTACT = "[CONTACT] Add";
export const ADDING_CONTACT = "[CONTACT] Adding";
export const REMOVE_CONTACT = "[CONTACT] Remove";
export const REMOVE_CONTACT_SUCCESS = "[CONTACT] Remove Success";
export const UPDATE_CONTACT = "[CONTACT] Update";
export const ADD_CONTACT_SUCCESS = "[CONTACT] Add Success";
export const ADD_CONTACT_ERROR = "[CONTACT] Add Error";
export const GET_CONTACT = "[CONTACT] Get Contact";
export const GET_CONTACT_SUCCESS = "[CONTACT] Get Success";

export class LoadContacts implements Action {
    readonly type = LOAD_CONTACTS;

    constructor() {
        console.log("LOAD_CONTACTS called");
    }
}

export class LoadContactsSuccess implements Action {
    readonly type = LOAD_CONTACTS_SUCCESS;

    constructor(public payload: Contact[]) {
        console.log("LOAD_CONTACTS_SUCCESS called");
        //var test = payload;
    }
}

export class AddContact implements Action {
    readonly type = ADD_CONTACT;

    constructor(public payload: Contact) {
        console.log("action Contact add: " + payload.firstName);
    }
}

export class AddContactError implements Action {
    readonly type = ADD_CONTACT_ERROR;

    constructor() {
        console.log("Error adding contact");
    }
}

export class AddingContact implements Action {
    readonly type = ADDING_CONTACT;

    constructor(public payload: Contact) {
        console.log("action Contact ADDING_CONTACT:");
    }
}

export class GetContact implements Action {
    readonly type = GET_CONTACT;

    constructor(public id: number) {
        console.log("action GET_CONTACT: " + id);
    }
}

export class GetContactSuccess implements Action {
    readonly type = GET_CONTACT_SUCCESS;

    constructor(public payload: Contact) {
        console.log("action GET_CONTACT_SUCCESS: " + payload);
    }
}

export class UpdateContact implements Action {
    readonly type = UPDATE_CONTACT;

    constructor(public id: number, public changes) {}
}

export class RemoveContact implements Action {
    readonly type = REMOVE_CONTACT;

    constructor(public id: number) {}
}

export class RemoveContactSuccess implements Action {
    readonly type = REMOVE_CONTACT_SUCCESS;

    constructor(public payload: number) {
        console.log("Action REMOVE_CONTACT_SUCCESS: " + payload);
    }
}

export class AddContactSuccess implements Action {
    readonly type = ADD_CONTACT_SUCCESS;

    constructor() {
        console.log("ADD_CONTACT_SUCCESS Contact add");
    }
}

export type Actions =
    | AddContact
    | UpdateContact
    | RemoveContact
    | AddingContact
    | AddContactSuccess
    | LoadContactsSuccess
    | LoadContacts
    | RemoveContactSuccess
    | GetContact
    | GetContactSuccess;

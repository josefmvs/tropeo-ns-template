import { Action } from "@ngrx/store";
import { Contact } from "./../models/contact.model";

import * as ContactActions from "./../actions/contact.actions";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createSelector, createFeatureSelector } from "@ngrx/store";

export interface ContactState extends EntityState<Contact> {}

export const adapter: EntityAdapter<Contact> = createEntityAdapter<Contact>({});

const initialState: Contact = <Contact>{};

export const initialContactState: ContactState = adapter.getInitialState();

export function contactReducers(
    state = initialContactState,
    action: ContactActions.Actions
) {
    switch (action.type) {
        case ContactActions.LOAD_CONTACTS_SUCCESS:
            console.log(
                "reducer load contact success, count: " +
                    action.payload["contacts"].length
            );
            adapter.removeAll(state);
            return adapter.addMany(action.payload["contacts"], state);
        case ContactActions.GET_CONTACT_SUCCESS:
            console.log(
                "reducer GET_CONTACT_SUCCESS : " + action.payload.firstName
            );
            return state;
        ///return adapter.addOne(action.payload, state);
        case ContactActions.ADD_CONTACT:
            console.log("reducer CONTACT add: " + action.payload.firstName);

            return adapter.addOne(action.payload, state);

        case ContactActions.UPDATE_CONTACT:
            if (state.entities[action.id] === undefined) {
                return state;
            }

            // console.log('xxxxxxxxxxxx');
            // console.log(action.id);
            // console.log(action.changes);

            return adapter.updateOne(
                {
                    id: action.id,
                    changes: action.changes
                },
                state
            );

        case ContactActions.REMOVE_CONTACT_SUCCESS:
            return adapter.removeOne(action.payload, state);
        default:
            return state;
    }
}

export const getContactState = createFeatureSelector<ContactState>("contacts");

// export const getContacts = createSelector(
// 	getContactState,
// 	state => state.contacts
// );

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors(getContactState);

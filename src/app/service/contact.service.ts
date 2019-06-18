import { Injectable } from "@angular/core";
import { DatabaseService } from "./sqlite/sqlite.service";
import { Observable, of, from } from "rxjs";
import * as ContactActions from "./../actions/contact.actions";
import * as fromContactReducer from "./../reducers/contact.reducer";
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Dictionary } from "@ngrx/entity";
import { Store, select } from "@ngrx/store";
import { ContactState } from "./../states/contact.state";
import { Contact } from "./../models/contact.model";

@Injectable()
export class ContactService {
    // constructor(private database: DatabaseService) {
    // }

    private allContacts;
    private allContacts2;
    private allContacts2$: Observable<Contact[]>;
    private contactById;

    constructor(
        private database: DatabaseService,
        private store: Store<ContactState>
    ) {
        this.allContacts = createSelector(
            fromContactReducer.selectAll,
            entities => {
                console.log("entities: " + JSON.stringify(entities));

                return entities;
            }
        );

        this.allContacts2 = createSelector(
            fromContactReducer.selectEntities,
            entities => {
                // console.log("entities: " + JSON.stringify(entities));
                // this.allContacts2$ = entities;
                return Object.keys(entities).map(id => entities[id]);
            }
        );

        this.contactById = createSelector(
            fromContactReducer.selectEntities,
            (entities: Dictionary<Contact>, props: { id: number }) => {
                return entities[props.id];
            }
        );
    }

    public add(data: Contact) {
        console.log("service Contact add: " + data.firstName);
        data.id = new Date().getTime();
        //this.store.dispatch(new ContactActions.AddContact(data) );
        this.store.dispatch(new ContactActions.AddingContact(data));
    }

    public list() {
        let list = this.store.pipe(select(this.allContacts));
        return list;
    }

    public entities() {
        let list = this.store.pipe(select(this.allContacts2));
        return list;
    }

    public getContacts() {
        this.store.dispatch(new ContactActions.LoadContacts());
    }

    public getContact(id: number) {
        console.log("Contact Server: getContact called for " + id);
        this.store.dispatch(new ContactActions.GetContact(id));
    }

    public remove(id: number) {
        this.store.dispatch(new ContactActions.RemoveContact(id));
    }

    public getDetail(id: number) {
        return this.store.pipe(select(this.contactById, { id: id }));
    }

    public edit(id: number, changes: Contact) {
        this.store.dispatch(new ContactActions.UpdateContact(id, changes));
    }

    public dbGetContacts() {
        return new Promise<Object>((resolve, reject) => {
            this.database.getdbConnection().then(db => {
                db.all(
                    "Select id, firstName, lastName, age from contacts"
                ).then(
                    rows => {
                        var _contacts = [];

                        rows.forEach(rec => {
                            var contact = {
                                id: rec[0],
                                firstName: rec[1],
                                lastName: rec[2],
                                age: rec[3]
                            };

                            _contacts.push(contact);
                        });

                        resolve({ contacts: _contacts });
                    },
                    error => {
                        console.log("SELECT ERROR", error);
                        resolve({ contacts: [] });
                    }
                );
            });
        });
    }

    // SQLITE QUERIES //

    public dbGetContact(id: number) {
        return new Promise<Object>((resolve, reject) => {
            this.database.getdbConnection().then(db => {
                db.get(
                    "Select id, firstName, lastName, age from contacts where id = ?",
                    [id]
                ).then(
                    row => {
                        var contact = {
                            id: row[0],
                            firstName: row[1],
                            lastName: row[2],
                            age: row[3]
                        };

                        resolve(contact);
                    },
                    error => {
                        console.log("SELECT ERROR", error);
                        resolve(null);
                    }
                );
            });
        });
    }

    public dbInsertContact(contact: Contact) {
        return new Promise<Object>((resolve, reject) => {
            this.database.getdbConnection().then(db => {
                db.execSQL(
                    "insert INTO contacts (id, firstName,lastName, age) VALUES (?, ?,?,?)",
                    [
                        contact.id,
                        contact.firstName,
                        contact.lastName,
                        contact.age
                    ]
                ).then(
                    id => {
                        resolve(contact);
                    },
                    err => {
                        console.log("error saving contact");
                        reject({});
                    }
                );
            });
        });
    }

    public dbRemoveContact(id: number) {
        let _id = id;
        return new Promise<Object>((resolve, reject) => {
            this.database.getdbConnection().then(db => {
                db.execSQL("DELETE FROM contacts WHERE id = ?", [id]).then(
                    id => {
                        resolve(_id);
                    },
                    err => {
                        reject(-1);
                    }
                );
            });
        });
    }

    public dbRemoveAllContacts() {
        return new Promise<Object>((resolve, reject) => {
            this.database.getdbConnection().then(db => {
                db.execSQL("DELETE FROM contacts").then(
                    () => {
                        resolve({ status: true });
                    },
                    err => {
                        reject({ status: false });
                    }
                );
            });
        });
    }
}

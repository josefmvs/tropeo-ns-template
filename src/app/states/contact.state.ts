import { Contact } from './../models/contact.model';

export interface ContactState {
  readonly contacts: Contact[];
}
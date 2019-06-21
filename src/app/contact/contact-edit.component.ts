import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { DataFormCommitMode } from "nativescript-ui-dataform";  
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { RouterExtensions } from "nativescript-angular/router";
import * as app from "tns-core-modules/application";
import { ActivatedRoute } from "@angular/router";
import { Contact } from "./../models/contact.model";
import { ContactService } from "./../service/contact.service";
import { Validators,AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: "ContactEdit",
    moduleId: module.id,
    templateUrl: "./contact-edit.component.html"
})
export class ContactEditComponent implements OnInit {
    private _commitMode;
    private _conctactId;
    contact: Contact;
    editContactForm: FormGroup; 
    private contactSub;
    public contactDetail;
    firstName: AbstractControl;
    lastName: AbstractControl;
    age: AbstractControl;

   

    constructor(
        private formBuilder:FormBuilder,
        private route: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private contactService: ContactService
    ) {
        this._conctactId = this.route.params["value"].id;
        this._commitMode = DataFormCommitMode.Manual;
        //  this.editContactForm = this.formBuilder.group({
        //     firstName: ["",Validators.required],
        //     lastName:["",Validators.required],
        //     age:["",Validators.required],
        // });
    }

    ngOnInit(): void {
        // this.getContact();
        //this.todoId  = params['id'];
        const detail = this.contactService.getDetail(this._conctactId);
        this.contactSub = detail.subscribe((res) => {
            if(res !== undefined) {
                this.contactDetail = res;
            } else {
                this.contactDetail = {};
            }
        })

        // this.firstName = this.editContactForm.controls['firstName'];
        // this.lastName = this.editContactForm.controls['lastName'];
        // this.age = this.editContactForm.controls['age'];
      
    }

    @ViewChild('myCommitDataForm') myCommitDataFormComp: RadDataFormComponent;

    get commitMode() {
        return this._commitMode;
    }

     onButtonTap(){
        let formvalues = this.editContactForm.value;
        //console.log(formvalues);
       
            // this._contact.firstName = formvalues.firstName;
            // this._contact.lastName = formvalues.lastName;
            // this._contact.age = Number(formvalues.age) || 0; //+ formvalues.age;
            // console.log(this._contact.firstName + ' ' + this._contact.lastName);
            // this.contactService.add(this._contact);
            this._routerExtensions.backToPreviousPage();
    }

    getContact() {
        this.contactService.getContact(this._conctactId);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    public onTap() {
        this.myCommitDataFormComp.dataForm.commitAll();
        this.contactService.edit(this._conctactId, this.contactDetail);
        this._routerExtensions.backToPreviousPage();
    }
}

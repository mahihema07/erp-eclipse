/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {RegistrationModel} from './app.registration.model';
import {IRegistrationModel} from './app.registration.model';

@Component({
    templateUrl: './app/components/registration/registration.html'
})

export class Registration {

    registrationModel: IRegistrationModel;
    private formUrl = 'register.do';

    constructor(private http: Http, public router: Router) {
        this.registrationModel = new RegistrationModel();
    }

    submit(values: IRegistrationModel) {
        if (values.password !== values.confirmpassword) {
            alert("Confirm password not matching");
            return;
        }
        this.http
            .post(this.formUrl, values)
            .map(res => {
                // If request fails, throw an Error that will be caught
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('This request has failed ' + res.status);
                }
                // If everything went fine, return the response
                else {
                    return res.json();
                }
            })
            .subscribe(data => {
                if (data.status === "success") {
                    alert(data.message);
                } else {
                    alert(data.message);
                }
            }, error => {
                console.log(JSON.stringify(error.json()));
            });
    }

    backToHome() {
        this.router.navigate(['/home']);
    }
}


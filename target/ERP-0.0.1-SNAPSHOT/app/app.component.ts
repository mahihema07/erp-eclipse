import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ILoginModel } from './models/loginmodel';
import { LoginModel } from './models/loginmodel';

import { AuthenticateService } from './common/services/app.authenticateservice';
import { AppConstants } from './common/services/app.constants'

@Component( {
    selector: 'pm-app',
    template: `
    <link href="./admindashstyles/vendor/loginmodal.css"
    rel="stylesheet" type="text/css">
         <div>
            <!-- Our components will be loaded here based on the current URL -->
            <button id="openModalButton" [hidden]="true" data-toggle="modal"
            data-target="#login-modal">Open Modal</button>
        <a href="#" data-toggle="modal" data-target="#login-modal"></a>
        <div class="modal fade" id="login-modal" tabindex="-1" role="dialog"
            data-keyboard="false" data-backdrop="static"
            aria-labelledby="myModalLabel" aria-hidden="true"
            style="display: none;">
            <div class="modal-dialog">
                <div class="loginmodal-container">
                    <h1>Login to Your Account</h1>
                    <br>
                    <form>
                        <input type="text" name="user" placeholder="Username"
                            [(ngModel)]="loginModel.username"> <input type="password"
                            name="pass" placeholder="Password"
                            [(ngModel)]="loginModel.password"> <input type="submit"
                            name="login" class="login loginmodal-submit" value="Login"
                            (click)="doLogin()">
                    </form>

                    <div class="login-help">
                        <a href="#">Register</a> - <a href="#">Forgot Password</a>
                    </div>
                </div>
            </div>
        </div>
            <router-outlet></router-outlet>
         </div>
    `
} )
export class AppComponent implements OnInit {
    private loginModel: ILoginModel;

    constructor( public router: Router, private authService: AuthenticateService, private route: ActivatedRoute ) {

        this.loginModel = new LoginModel();
    }


    ngOnInit() {
        /*if("/"===this.router.url){
            this.router.navigate( ['/home'] );
        }*/
    }

    doLogin(): void {
        let values = this.loginModel;

        this.authService.authenticateUser( values ).subscribe( data => {
            this.data = data
            if ( this.data[AppConstants.RESPONSE_STATUS] === AppConstants.RESPONSE_STATUS_SUCCESS ) {
                document.getElementById( "openModalButton" ).click();
                this.router.navigate( ['/home'] );
            } else {
                alert( this.data[AppConstants.RESPONSE_MESSAGE] );
            }
        },
            error => this.errormessage = <any>error );
    }
}

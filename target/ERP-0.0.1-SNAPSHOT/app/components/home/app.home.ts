/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { Component, OnInit } from '@angular/core';


import { AuthenticateService } from '../../common/services/app.authenticateservice';

@Component( {
    templateUrl: './app/components/home/home.html'
} )



export class Home implements OnInit {

    
    data: any;

    constructor( private authService: AuthenticateService ) {
    }

    ngOnInit() {
        //this.showLogin();
    }

    showLogin() {
        try {
            document.getElementById( "openModalButton" ).click();
        } catch ( e ) {
            console.log( e );
        }
    }

   

}


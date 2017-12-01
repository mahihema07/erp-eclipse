/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConstants } from '../../../common/services/app.constants';

/*import { ISpecificationComponentModel } from './app/models/specification_components'
import { SpecificationComponentModel } from './app/models/specification_components'*/


@Component( {
    templateUrl: './app/components/products/specification_components/specification_crud.html'/*,
    providers: [CategoriesService]*/
} )



export class SpecificationCrud implements OnInit {

    private specificationComponent: any;
    private loadDataByIdUrl: string;
    private submitFormUrl: string;
    private show_throbber: boolean;
    private modelDeleteUrl: string;


    constructor( private http: Http, private route: ActivatedRoute, private router: Router ) {
        this.loadDataByIdUrl = "loadSpecificationComponentById.do";
        this.submitFormUrl = "saveOrUpdateSpecificationComponent.do";
        this.modelDeleteUrl = "deleteSpecificationComponent.do";
    }

    ngOnInit() {

        this.route.params.subscribe( params => {
            let id = params['id'];
            if ( id == 0 ) {
                this.specificationComponent = {};
            } else {
                this.http
                    .post( this.loadDataByIdUrl, id )
                    .map( res => {
                        return res.json();
                    } ).subscribe(
                    data => {
                        this.specificationComponent = JSON.parse( data[AppConstants.RESPONSE_DATA] );
                        //this.previousFormValues = JSON.parse(JSON.stringify(data));
                    } );
            }
        } );
    }

    submitForm( data:any ) {
        try {
            this.show_throbber = true;

            this.http
                .post( this.submitFormUrl, data )
                .map( res => {
                    return res.json();
                } )
                .subscribe( data => {
                    if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                        document.getElementById( "openModalButton" ).click();
                    } else {
                        alert( data[AppConstants.RESPONSE_MESSAGE] );
                        this.show_throbber = false;
                        this.router.navigate( ['home/specificatoncomponent/list'] );
                    }
                }, err => {
                    this.show_throbber = false;
                    console.log( err );
                } );
        } catch ( e ) {
            console.error( e );
        }
    }

    backToHome() {
        this.router.navigate( ['home/specificatoncomponent/list'] );
    }

    deleteModel( id: any ) {

        this.http
            .post( this.modelDeleteUrl, id )
            .map( res => {
                return res.json();
            } )
            .subscribe( data => {
                this.show_throbber = false;

                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    alert( data[AppConstants.RESPONSE_MESSAGE] );
                    this.router.navigate( ['home/specificatoncomponent/list'] );
                }
            }, err => {
                this.show_throbber = false;
                console.log( err );
            } );

    }

}


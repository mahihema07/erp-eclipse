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

import { UomService } from '../unitofmeasure/services/app.uom.service'
import { SpecificationComponentService } from '../specification_components/services/app.specification.service'

/*import { ISpecificationComponentModel } from './app/models/specification_components'
import { SpecificationComponentModel } from './app/models/specification_components'*/


@Component( {
    templateUrl: './app/components/products/product_specifications/productspecification_crud.html',
    providers: [UomService, SpecificationComponentService]
} )



export class ProductSpecificationCrud implements OnInit {

    private listRoute: string = 'home/productspecification/list'

    private formData: any;
    private gridData: any;
    private loadDataByIdUrl: string;
    private submitFormUrl: string;
    private modelDeleteUrl: string;
    private show_throbber: boolean;

    //combo data
    private uom: any;
    private specificationComponents: any;

    private blankGridData: any = {
        specificationValue: 0,
        uomId: null,
        specificationComponentId: null
    }


    constructor( private http: Http, private route: ActivatedRoute, private router: Router,
        private uomService: UomService, private specificationComponentService: SpecificationComponentService ) {
        this.loadDataByIdUrl = "loadProductSpecificationById.do";
        this.submitFormUrl = "saveOrUpdateProductSpecification.do";
        this.modelDeleteUrl = "deleteProductSpecification.do"
    }

    ngOnInit() {

        this.route.params.subscribe( params => {

            this.show_throbber = true;

            let id = params['id'];

            this.loadCombos();

            if ( id == 0 ) {
                this.formData = {};
                this.gridData = [];
            } else {
                this.loadFormData( id );
            }
        } );
    }

    submitForm( data: any ) {
        try {
            this.show_throbber = true;

            var params = {
                headerData: this.formData,
                gridData: this.gridData
            }

            this.http
                .post( this.submitFormUrl, params )
                .map( res => {
                    return res.json();
                } )
                .subscribe( data => {
                    this.show_throbber = false;

                    if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                        document.getElementById( "openModalButton" ).click();
                    } else {
                        alert( data[AppConstants.RESPONSE_MESSAGE] );
                        if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS )
                            this.router.navigate( [this.listRoute] );
                    }
                }, err => {
                    this.show_throbber = false;
                    alert( err );
                    console.log( err );
                } );
        } catch ( e ) {
            console.error( e );
        }
    }

    backToHome() {
        this.router.navigate( [this.listRoute] );
    }

    loadFormData( id: string ) {
        this.http
            .post( this.loadDataByIdUrl, id )
            .map( res => {
                return res.json();
            } )
            .subscribe( data => {
                this.show_throbber = false;
                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    var dataObj = ( data[AppConstants.RESPONSE_DATA] );
                    this.formData = ( dataObj.headerData );
                    this.gridData = dataObj.detailData;
                }
            }, err => {
                this.show_throbber = false;
                console.log( err );
            } );
    }

    loadCombos() {

        this.specificationComponentService.loadAllSpecificationComponents()
            .subscribe(
            data => {
                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    var dataObj = JSON.parse( data[AppConstants.RESPONSE_DATA] );
                    this.specificationComponents = dataObj;
                   
                }
            },
            err => {
                alert( err );
                console.log( err );
            } );

        //Loading uom
        this.uomService.loadAllUoms()
            .subscribe(
            data => {
                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS ) {
                        var dataObj = ( data[AppConstants.RESPONSE_DATA] );
                        this.uom = dataObj;
                    } else {
                        alert( data[AppConstants.RESPONSE_MESSAGE] );
                    }
                }
            },
            err => {
                alert( err );
                console.log( err );
            } );
    }

    addRows() {
        this.gridData.push( this.blankGridData );
    }

    removeRow( item: any, index: any ) {
        this.gridData.splice( index, 1 );
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
                    if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS )
                        this.router.navigate( [this.listRoute] );
                }
            }, err => {
                this.show_throbber = false;
                console.log( err );
            } );

    }

    isValidForm(): boolean {

        return true;
    }

}


import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConstants } from '../../../common/services/app.constants';

import { ProductsService } from './service/app.product.service'
import { ProductSpecificationService } from "../product_specifications/service/app.productspecification.service";
import { UomService } from "../unitofmeasure/services/app.uom.service";
import { CategoryService } from "../product_category/services/app.category.service";

@Component( {
    templateUrl: './app/components/products/productsmaster/products_crud.html',
    providers: [ProductsService, ProductSpecificationService, UomService, CategoryService]
} )

export class ProductsCrud implements OnInit {
    private category: any;

    private uom: any;
    private productsspecification: any;
    private productSpecification: any;
    private listRoute: string = 'home/products/list'

    private formData: any;
    private gridData: any;
    private show_throbber: boolean;

    getBlankGridData() {

        let productSpecificationHdrId: null;
    }

    constructor( private http: Http, private route: ActivatedRoute, private router: Router,
        private formService: ProductsService, private productSpecificationService: ProductSpecificationService,
        private uomService: UomService, private categoryService: CategoryService ) {

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
            this.show_throbber = false;
        } );
    }

    submitForm( data: any ) {
        try {
            this.show_throbber = true;

            var params = {
                headerData: this.formData,
                gridData: this.gridData
            }

            this.formService.submitModel( params )
                .subscribe( data => {
                    this.show_throbber = false;

                    if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                        document.getElementById( "openModalButton" ).click();
                    } else {
                        alert( data[AppConstants.RESPONSE_MESSAGE] );
                        if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS )
                            this.router.navigate( [this.listRoute] );
                    }
                },
                err => {
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

        this.formService.loadModelDataById( id )
            .subscribe( data => {
                this.show_throbber = false;
                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    var dataObj = ( data[AppConstants.RESPONSE_DATA] );
                    this.formData = ( dataObj.headerData );
                    this.gridData = dataObj.detailData;

                }
            },
            err => {
                this.show_throbber = false;
                alert( err );
                console.log( err );
            } );


    }

    deleteModel( id: any ) {

        this.formService.deleteModel( id )
            .subscribe( data => {
                this.show_throbber = false;

                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    alert( data[AppConstants.RESPONSE_MESSAGE] );
                    if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS )
                        this.router.navigate( [this.listRoute] );
                }
            },
            err => {
                this.show_throbber = false;
                alert( err );
                console.log( err );
            } );

    }

    loadCombos() {

        this.productSpecificationService.loadAllProductSpecifications()
            .subscribe(
            data => {
                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS ) {
                        var dataObj = ( data[AppConstants.RESPONSE_DATA] );
                        this.productsspecification = dataObj;
                    } else {
                        alert( data[AppConstants.RESPONSE_MESSAGE] );
                    }
                }
            },
            err => {
                alert( err );
                console.log( err );
            } );

        //load uom

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

        //load Category
        this.categoryService.loadAllModelData()
            .subscribe(
            data => {
                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS ) {
                        var dataObj = ( data[AppConstants.RESPONSE_DATA] );
                        this.category = dataObj;

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
        this.gridData.push( new this.getBlankGridData() );
    }

    removeRow( item: any, index: any ) {
        this.gridData.splice( index, 1 );
    }

    isValidForm(): boolean {

        return true;
    }

}

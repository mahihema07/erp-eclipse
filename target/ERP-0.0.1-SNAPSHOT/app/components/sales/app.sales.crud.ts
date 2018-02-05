import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConstants } from '../../common/services/app.constants';
import { SalesService } from "./services/app.sales.service";
import { ProductsService } from "../products/productsmaster/service/app.product.service";
import { CustomerService } from "../customers/services/app.customers.service";
import * as Handsontable from 'handsontable';
import { getBasicData } from './data';


@Component( {
    templateUrl: './app/components/sales/sales_crud.html',
    providers: [SalesService, CustomerService, ProductsService]

} )

export class SalesCrud implements OnInit {


    private stockhdrid: any;
    private hdrid: any;
    private specificationlist: any;

    private data: any[] = [];
    private options: any;
    private columns: any[];
    private rows: any[];
    private rate: any[] = ['100', '200', '300'];

    private colHeaders: string[] = [];
    private productName: any[] = [];


    private loadDataAllUrl: any;
    private producthdr: any;
    private customer: any;
    private gridData: any;
    private listRoute: string = 'home/sales/list'
    private tablename: string = 'sales';


    private formData: any;
    getBlankGridData() {

        let producthdrid: "";
        let productdtlid: "";
        let quantity: "";
        let rate: "";
        let totalprice: "";

    }


    private show_throbber: boolean;
    constructor( private http: Http, private route: ActivatedRoute, private router: Router,
        private formService: SalesService, private customerService: CustomerService,
        private productservice: ProductsService ) {



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


        this.loadSheet();
    }

    loadSheet() {



        this.options = {
            height: 396,
            rowHeaders: false,

            stretchH: 'all',
            columnSorting: true,
            contextMenu: true
        };



        this.columns = [

            {
                data: 'productName',
                renderer: 'text',
                readOnly: true,
                source: 'productName',
            }
        ]
    }


    submitForm( data: any ) {
        try {
            this.show_throbber = true;

            var params = {
                headerData: this.formData,
                gridData: this.gridData,

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
                    //this.data = [{ "specificationName": "ABC" }, { "specificationName": "XYZ" }];
                    //this.data = dataObj.detailData;
                    this.loadDataForGrid( this.gridData );
                }
            },
            err => {
                this.show_throbber = false;
                alert( err );
                console.log( err );
            } );


    }

    loadCombos() {

        //load all customer

        this.customerService.loadAllModelData()
            .subscribe(
            data => {
                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS ) {
                        var dataObj = ( data[AppConstants.RESPONSE_DATA] );
                        this.customer = dataObj;

                    } else {
                        alert( data[AppConstants.RESPONSE_MESSAGE] );
                    }
                }
            },
            err => {
                alert( err );
                console.log( err );
            } );

        //product hdr combo

        this.productservice.loadAllModelData()
            .subscribe(
            data => {
                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS ) {
                        var dataObj = ( data[AppConstants.RESPONSE_DATA] );
                        this.producthdr = dataObj;
                        this.loadProductName( dataObj );

                    } else {
                        alert( data[AppConstants.RESPONSE_MESSAGE] );
                    }
                }
            },
            err => {
                alert( err );
                console.log( err );
            } );

        //load product specification

        this.productservice.loadAllProductData()
            .subscribe(
            data => {
                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS ) {
                        var dataObj = ( data[AppConstants.RESPONSE_DATA] );
                        this.specificationlist = dataObj;

                        this.loadSpecificationNames( dataObj );
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





    loadSpecificationNames( specificationlist: any ) {
        this.colHeaders.push( "Specification List " );

        for ( let i = 0; i < specificationlist.length; i++ ) {
            let it: any = specificationlist[i];
            this.colHeaders.push( it.specificationName );
            // this.columns.push( {"data":"this.colHeaders"},{"renderer" :"text"},);
            this.columns.push( this.colHeaders );
        }
        this.colHeaders.push( "Grand Total" );
        this.columns.push( this.colHeaders );

    }

    loadProductName( productname: any ) {
        // this.data.push( { "productName": "Rate " } );
        // this.data.push( { "productName": "Products " } );
        for ( let i = 0; i < productname.length; i++ ) {
            let name: any = productname[i];
            this.data.push( { "productName": name.productName } );

        }
        this.data.push( { "productName": "Product Total" } );
    }


    loadDataForGrid( griddata: any ) {
        for ( let i = 0; i < griddata.length; i++ ) {
            let name: any = griddata[i];
            console.log( "quantity= ", name.quantity );
            console.log( "rate= ", name.rate );
            this.data.push({"quantity" : name.quantity});
        }
    }


    backToHome() {
        this.router.navigate( [this.listRoute] );
    }
    addRows() {
        this.gridData.push( new this.getBlankGridData() );
    }
    removeRow( item: any, index: any ) {
        this.gridData.splice( index, 1 );
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

    isValidForm(): boolean {

        return true;
    }


}

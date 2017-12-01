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

import { ISpecificationComponentModel } from 'app/models/specification_components'


@Component( {
    templateUrl: './app/components/products/specification_components/specification_list.html'/*,
    providers: [CategoriesService]*/
} )



export class SpecificationList implements OnInit {
    private formSubmitUrl: string;
    private formLoadUrl: string;
    private specificationcomponents: ISpecificationComponentModel[];
    private filterQuery = "";
    private modelDeleteUrl: string;

    public data: any;
    private rowsOnPage = 10;
    public activePage: number = 1;
    public itemsTotal = 0;
    private initialPageNo: number = 1;
    private sortOrder: string = 'asc';

    public searchFiltervalue: string;
    private show_throbber: boolean = false;

    constructor( private http: Http, private route: ActivatedRoute, private router: Router ) {
        this.formLoadUrl = "loadspecificationcomponentsbypage.do"
        this.modelDeleteUrl = "deleteSpecificationComponent.do";
    }

    ngOnInit() {
        this.loadDataByPage( this.initialPageNo );
    }

    private backToHome(): void {
        this.router.navigate( ['/home'] );
    }

    private loadDataByPage( page: number ): void {

        let url: string = this.formLoadUrl; //+ "?pageNumber=" + page + "&rowsOnPage=" + this.rowsOnPage + "&statusFilter=" + this.searchFiltervalue + "&searchFilter=" + this.filterQuery;

        let params = {
            pageNumber: page,
            rowsOnPage: this.rowsOnPage,
            searchFilter: this.filterQuery
        };
        this.show_throbber = true;

        this.http
            .post( url, params )
            .map( res => {
                return res.json();
            } )
            .subscribe( data => {
                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    this.specificationcomponents = JSON.parse( data[AppConstants.RESPONSE_DATA] );
                    this.data = JSON.parse( data[AppConstants.RESPONSE_DATA] );
                    this.itemsTotal = data[AppConstants.RESPONSE_DATA_COUNT];
                    this.show_throbber = false;
                }
            }, err => {
                this.show_throbber = false;
                console.log( err );
            } );

    }

    private onPageChange( page: number ): void {
        //this.rowsOnPage = event.rowsOnPage;
        this.activePage = page;
        this.loadDataByPage( page );
    }

    private filterQueryChange( event: any ): void {
        this.loadDataByPage( this.initialPageNo );
    }

    private createNew(): void {
        this.router.navigate( ['home/specificatoncomponent/crud', 0] );
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
                    this.loadDataByPage( this.initialPageNo );
                }
            }, err => {
                this.show_throbber = false;
                console.log( err );
            } );

    }


}


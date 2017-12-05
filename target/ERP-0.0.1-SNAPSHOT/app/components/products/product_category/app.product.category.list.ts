import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConstants } from '../../../common/services/app.constants';

import { CategoryService } from './services/app.category.service'

@Component( {
    templateUrl: './app/components/products/product_category/category_list.html',
    providers: [CategoryService]
} )

export class CategoryList implements OnInit {
    private modelDeleteUrl: string;
    private crudRoute: string = 'home/category/crud';

    private listData: any;
    private filterQuery = "";
    private formLoadUrl: string;
    public data: any;
    private rowsOnPage = 10;
    public activePage: number = 1;
    public itemsTotal = 0;
    private initialPageNo: number = 1;
    private sortOrder: string = 'asc';

    public searchFiltervalue: string;
    private show_throbber: boolean = false;

    constructor( private http: Http, private route: ActivatedRoute, private router: Router,
        private formService: CategoryService ) {
        this.formLoadUrl = "loadproductsbypage.do";
        this.modelDeleteUrl = "deleteProduct.do";
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

        this.formService.loadModelDataByPage( params )
            .subscribe( data => {
                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    this.listData = ( data[AppConstants.RESPONSE_DATA] );
                    this.data = ( data[AppConstants.RESPONSE_DATA] );
                    this.itemsTotal = data[AppConstants.RESPONSE_DATA_COUNT];
                    this.show_throbber = false;
                }
            },
            err => {
                this.show_throbber = false;
                console.log( err );
            } );

    }

    private onPageChange( page: number ): void {
        this.activePage = page;
        this.loadDataByPage( page );
    }

    private filterQueryChange( event: any ): void {
        this.loadDataByPage( this.initialPageNo );
    }

    private createNew(): void {
        this.router.navigate( [this.crudRoute, 0] );
    }

    deleteModel( id: any ) {
        
        this.formService.deleteModel( id )
        .subscribe( data => {
            this.show_throbber = false;

            if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                document.getElementById( "openModalButton" ).click();
            } else {
                alert( data[AppConstants.RESPONSE_MESSAGE] );
                this.loadDataByPage( this.initialPageNo );
            }
        },
        err => {
            this.show_throbber = false;
            console.log( err );
        } );

    }


}
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { AppConstants } from "../../common/services/app.constants";
import { PurchaseService } from "./services/app.purchase.service";


@Component( {
    templateUrl: './app/components/purchase/purchase_list.html',
    providers: [PurchaseService]
} )



export class PurchaseList implements OnInit {
    private listData: any;
    private listRoute: string = 'home/purchase/list'
    private filterQuery = "";
    public data:any;
    private rowsOnPage = 10;
    public activePage: number = 1;
    public itemsTotal = 0;
    private initialPageNo: number = 1;
    private sortOrder:string='asc';

    public searchFiltervalue: string;
    private show_throbber: boolean = false;
   
    
    constructor( private http: Http, private route: ActivatedRoute, private router: Router,
            private formService: PurchaseService ) {
    }
    
    ngOnInit() {
        this.loadDataByPage( this.initialPageNo );
    }
    
    private onPageChange(page: number): void {
       
        this.activePage = page;
        this.loadDataByPage(page);
    }
    
    private createNew(): void {
        this.router.navigate(['home/purchase/crud',0]);
    }
    
    private filterQueryChange(event: any): void {
        this.loadDataByPage(this.initialPageNo);
    }
    
    private loadDataByPage( page: number ): void {

       
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
    deleteModel( id: any ) {
        
        this.formService.deleteModel( id )
        .subscribe( data => {
            this.show_throbber = false;

            if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                document.getElementById( "openModalButton" ).click();
            } else {
                alert( data[AppConstants.RESPONSE_MESSAGE] );
                if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS )
                    this.loadDataByPage( this.initialPageNo );
            }
        },
        err => {
            this.show_throbber = false;
            alert( err );
            console.log( err );
        } );

    }

}
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConstants } from '../../common/services/app.constants';

import { AcountingService } from "./services/app.accounting.service";
import { ChartOfAccountsService } from "../accounts/chartofaccounts/services/app.coa.service";
import { AccountGroupService } from "../accounts/groups/services/app.groups.service";






@Component( {
    templateUrl: './app/components/accounting/crud_accountingdefaults.html',
    providers: [AcountingService,ChartOfAccountsService,AccountGroupService]
    
} )

export class AccountingCrud implements OnInit {
    private formdata: null;
    private accountdata: any;
    private groupdata:any;
    private show_throbber: boolean;


    constructor( private http: Http, private route: ActivatedRoute, private router: Router,
            private formService: AcountingService,private accountservice:ChartOfAccountsService,
            private groupservice:AccountGroupService) { 
                
        }

        ngOnInit() {

                this.loadDataByPage();
                this.loadcombo();
                this.show_throbber = false;
        }
        
        loadDataByPage( ): void {
            this.show_throbber = true;

            this.formService.loadModelDataByPage(  )
                .subscribe( data => {
                    if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                        document.getElementById( "openModalButton" ).click();
                    } else {
                        this.formdata = ( data[AppConstants.RESPONSE_DATA] );
                        this.data = ( data[AppConstants.RESPONSE_DATA] );
                        
                        this.show_throbber = false;
                    }
                },
                err => {
                    this.show_throbber = false;
                    console.log( err );
                } );

        }

        
        loadcombo( ){
            
            this.accountservice.loadAllModelData()
            .subscribe(
                    data => {
                        if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                            document.getElementById( "openModalButton" ).click();
                        } else {
                            if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS ) {
                                var dataObj = ( data[AppConstants.RESPONSE_DATA] );
                                this.accountdata = dataObj;
                               
                                
                           } else {
                                alert( data[AppConstants.RESPONSE_MESSAGE] );
                            }
                        }
                    },
                    err => {
                        alert( err );
                        console.log( err );
                    } );
            
            
            this.groupservice.loadAllModelData()
            .subscribe(
                    data => {
                        if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                            document.getElementById( "openModalButton" ).click();
                        } else {
                            if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS ) {
                                var dataObj = ( data[AppConstants.RESPONSE_DATA] );
                                this.groupdata = dataObj;
                             
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
        
        submitForm( data: any ) {
            try {
                this.show_throbber = true;

                var params = {
                    headerData: this.formdata,
                    
                }

                this.formService.submitModel( params )
                .subscribe( data => {
                    this.show_throbber = false;

                    if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                        document.getElementById( "openModalButton" ).click();
                    } else {
                        alert( data[AppConstants.RESPONSE_MESSAGE] );
                        if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS )
                          this.loadDataByPage();  
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
        
        
        deleteModel( id: any ) {
            
            this.formService.deleteModel( id )
            .subscribe( data => {
                this.show_throbber = false;

                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    alert( data[AppConstants.RESPONSE_MESSAGE] );
                    if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS )
                        this.loadDataByPage();  
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

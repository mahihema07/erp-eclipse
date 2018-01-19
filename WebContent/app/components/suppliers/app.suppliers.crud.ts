import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConstants } from '../../common/services/app.constants';


import { SupplierService } from "./services/app.suppliers.service";
import { ChartOfAccountsService } from "../accounts/chartofaccounts/services/app.coa.service";

@Component( {
    templateUrl: './app/components/suppliers/suppliers_crud.html',
    providers: [SupplierService,ChartOfAccountsService]
    
} )

export class SuppliersCrud implements OnInit {
    private coadata: any;
    private gridData: any;
    private listRoute: string = 'home/suppliers/list'

        private formData: any;
getBlankGridData(){
    
    let lineA:"";
    let lineb:"";
    let city:"";
    let  state:"";
    let country:"";
    let zip:"";
    let primephone:"";
    let secondphone:"";
    let primemail:"";
    let secondenail:"";
    let website:"";
        }
        
        private show_throbber: boolean;
        constructor( private http: Http, private route: ActivatedRoute, private router: Router,
            private formService: SupplierService,private coaservice: ChartOfAccountsService) { 
                
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
                this.show_throbber = false ;
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
            loadCombos() {
                
                this.coaservice.loadAllModelData()
                .subscribe(
                data => {
                    if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                        document.getElementById( "openModalButton" ).click();
                    } else {
                        if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS ) {
                            var dataObj = ( data[AppConstants.RESPONSE_DATA] );
                            this.coadata = dataObj;
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
  
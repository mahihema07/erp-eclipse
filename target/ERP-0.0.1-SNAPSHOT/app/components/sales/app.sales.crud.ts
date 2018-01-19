import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConstants } from '../../common/services/app.constants';


import { SalesService } from "./services/app.sales.service";

import { ProductsService } from "../products/productsmaster/service/app.product.service";
import { CustomerService } from "../customers/services/app.customers.service";



@Component( {
    templateUrl: './app/components/sales/sales_crud.html',
    providers: [SalesService,CustomerService,ProductsService]
    
} )

export class SalesCrud implements OnInit {
    private stockhdrid: any;
    private hdrid: any;
   
  
    private specificationlist: any;
      
    private loadDataAllUrl: any;
    private producthdr: any;
    private customer: any;
    private gridData: any;
    private listRoute: string = 'home/sales/list'
    private tablename:string='sales';   

        private formData: any;
        getBlankGridData(){
        
                let producthdrid:"";
                let productdtlid:"";
                let quantity:"";
                let rate:"";
                let totalprice:"";
                    
            }

        
        private show_throbber: boolean;
        constructor( private http: Http, private route: ActivatedRoute, private router: Router,
            private formService: SalesService,private customerService :CustomerService,
            private productservice:ProductsService) { 
          
                
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
        
        
        //stock entry
    /*    
        submitStock(data : any) {
            
           
            var params = {
                    headerData: this.formData,
                    gridData: this.gridData,
                    tablename:this.tablename,
                    hdrid:this.hdrid,
                    stockhdrid:this.stockhdrid
                }
            this.stockservice.submitModel( params)
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

        loadStockById( id: string ) {
            
            this.stockservice.loadModelDataById( id )
            .subscribe( data => {
                this.show_throbber = false;
                if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                    document.getElementById( "openModalButton" ).click();
                } else {
                    var dataObj = ( data[AppConstants.RESPONSE_DATA] );
                    this.stockhdrid = ( dataObj.headerData );
                   
                   
                }
            },
            err => {
                this.show_throbber = false;
                alert( err );
                console.log( err );
            } );
            

        }
  */      
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
  
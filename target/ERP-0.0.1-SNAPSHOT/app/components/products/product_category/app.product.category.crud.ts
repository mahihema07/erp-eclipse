import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConstants } from '../../../common/services/app.constants';

import { CategoryService } from './services/app.category.service'

@Component( {
    templateUrl: './app/components/products/product_category/category_crud.html',
    providers: [CategoryService]
    
} )

export class CategoryCrud implements OnInit {
   
   
    
    private listRoute: string = 'home/category/list'

    private formData: any;
    
    private show_throbber: boolean;

    
    constructor( private http: Http, private route: ActivatedRoute, private router: Router,
        private formService: CategoryService) { 
            
    }

    ngOnInit() {

        this.route.params.subscribe( params => {

            this.show_throbber = true;

            let id = params['id'];
           
           
            if ( id == 0 ) {
                this.formData = {};
                
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

    

    

    isValidForm(): boolean {

        return true;
    }

}

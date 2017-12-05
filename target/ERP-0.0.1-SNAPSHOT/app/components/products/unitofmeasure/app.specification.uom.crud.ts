import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*import { ISpecificationComponentModel } from './app/models/specification_components'
import { SpecificationComponentModel } from './app/models/specification_components'*/


@Component( {
    templateUrl: './app/components/products/unitofmeasure/uom_crud.html'/*,
    providers: [CategoriesService]*/
} )



export class SpecificationUomCrud implements OnInit {
    specificationUom: any;
    deleteUomDataByIdUrl: any;

    saveUomDataByIdUrl: any;
    griddata: {};
    loadSpecificationUomCrud: any;
    show_throbber: boolean;
    constructor( private http: Http, private route: ActivatedRoute, private router: Router ) {
        this.loadSpecificationUomCrud = "loadSpecificationUomCrudPageById.do";
        this.saveUomDataByIdUrl = "saveUomDataById.do";

        this.deleteUomDataByIdUrl = "deleteUomDataById.do";
    }
    ngOnInit() {
        this.route.params.subscribe( params => {

            this.show_throbber = true;

            let id = params['id'];

            this.loadSpecificationUom( id );
        } );

    }
    loadSpecificationUom( id: any ): void {
        this.route.params.subscribe( params => {
            let id = params['id'];
            if ( id == 0 ) {
                this.griddata = {};

            } else {
                this.http
                    .post( this.loadSpecificationUomCrud, id )
                    .map( res => {
                        return res.json();
                    } ).subscribe(
                    data => {
                        this.griddata = JSON.parse( data.data );

                    } );
            }
        } );

    }


    submitForm( formdata: any ): void {
        this.http
            .post( this.saveUomDataByIdUrl, formdata )
            .map( res => {
                return res.json();
            } ).subscribe(
            data => {
                this.specificationUom = JSON.parse( data.data );

                alert( "succes" );
                this.router.navigate( ['home/SpecificationUom/list'] );
            }, err => {
                console.log( err );
            } );
    }



    deleteFunc( uomdata: any ): void {


        this.http
            .post( this.deleteUomDataByIdUrl, uomdata )
            .map( res => {
                return res.json();
            } ).subscribe(
            data => {

                alert( "succes" );
                this.router.navigateByUrl( 'home/SpecificationUom/list' );
            } );
    }


    cancelFunc(): void {
        this.router.navigate( ['home/SpecificationUom/list'] );
    }

}
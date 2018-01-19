import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ISpecificationUomModel } from 'app/models/Uom'


@Component( {
    templateUrl: './app/components/products/unitofmeasure/uom_list.html'/*,
    providers: [CategoriesService]*/
} )



export class SpecificationUomList implements OnInit {
    private deleteUomDataByIdUrl: string;
    private formdata: ISpecificationUomModel[];
    
    formLoadUrl: any;
    private filterQuery = "";
    public data:any;
    private rowsOnPage = 10;
    public activePage: number = 1;
    public itemsTotal = 0;
    private initialPageNo: number = 1;
    private sortOrder:string='asc';

    public searchFiltervalue: string;
    private show_throbber: boolean = false;
    
    constructor( private http: Http, private route: ActivatedRoute, private router: Router ) {
        this.formLoadUrl = "loadspecificationuombypage.do";
        this.deleteUomDataByIdUrl="deleteUomDataById.do";
    }
    ngOnInit() {
        this.loadDataByPage( this.initialPageNo );
    }
    
    private onPageChange(page: number): void {
        //this.rowsOnPage = event.rowsOnPage;
        this.activePage = page;
        this.loadDataByPage(page);
    }
        
    private createNew(): void {
        this.router.navigate(['home/SpecificationUom/crud',0]);
    }
    
    private filterQueryChange(event: any): void {
        this.loadDataByPage(this.initialPageNo);
    }
    
    private loadDataByPage( page: number ): void {

        let url: string = this.formLoadUrl; //+ "?pageNumber=" + page + "&rowsOnPage=" + this.rowsOnPage + "&statusFilter=" + this.searchFiltervalue + "&searchFilter=" + this.filterQuery;

    let params={
            pageNumber:page,
            rowsOnPage:this.rowsOnPage,
            searchFilter:this.filterQuery
    };
        this.show_throbber = true;

        this.http
            .post( url ,params)
            .map( res => {
                return res.json();
            } )
            .subscribe( data => {
                if(!data.IsAuthenticated){
                    document.getElementById( "openModalButton" ).click();
                }else{
                    this.formdata = JSON.parse(data.data);
                    this.data = JSON.parse(data.data);
                    this.itemsTotal = data.count;
                    this.show_throbber = false;
                }
            }, err => {
                this.show_throbber = false;
                console.log( err );
            } );

    }
    deleteFunc(uomdata : any): void {
        
        this.http
        .post( this.deleteUomDataByIdUrl, uomdata )
        .map( res => {
            return res.json();
        } ).subscribe(
        data => {
           
            alert(data.status);
            this.loadDataByPage( this.initialPageNo );
        } );
   }
    cancelFunc():void{
        this.router.navigate(['home/SpecificationUom/list']);
    }
    
}
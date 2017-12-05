import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ChartOfAccountsService {

    private loadDataByIdUrl: string;
    private loadDataAllUrl: string;
    private submitFormUrl: string;
    private modelDeleteUrl: string;
    private loadDataByPageUrl: string;

    constructor( private http: Http ) {
        this.loadDataByIdUrl = "loadChartOfAccountsById.do";
        this.submitFormUrl = "saveOrUpdateChartOfAccounts.do";
        this.modelDeleteUrl = "deleteChartOfAccounts.do"
        this.loadDataAllUrl = "loadAllChartOfAccounts.do"
        this.loadDataByPageUrl = "loadChartOfAccountsbypage.do"
    }

    loadAllModelData(): Observable<any> {
        return this.http
            .post( this.loadDataAllUrl, {} )
            .map(( res: Response ) => res.json() )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    loadModelDataById( id: string ): Observable<any> {
        return this.http
            .post( this.loadDataByIdUrl, id )
            .map(( res: Response ) => res.json() )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    loadModelDataByPage( params: any ): Observable<any> {
        return this.http
            .post( this.loadDataByPageUrl, params )
            .map(( res: Response ) => res.json() )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    submitModel( params: any ): Observable<any> {
        return this.http
            .post( this.submitFormUrl, params )
            .map(( res: Response ) => res.json() )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    deleteModel( id: string ): Observable<any> {
        return this.http
            .post( this.modelDeleteUrl, id )
            .map(( res: Response ) => res.json() )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }
}
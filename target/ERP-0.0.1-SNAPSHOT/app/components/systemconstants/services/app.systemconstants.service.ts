import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class systemconstantService {
    
    constructor( private http: Http ) { }

    loadAllSystemConstants(key:any): Observable<any> {
        return this.http
            .post( "loadSystemConstant.do", key )
            .map(( res: Response ) => res.json() )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }
}

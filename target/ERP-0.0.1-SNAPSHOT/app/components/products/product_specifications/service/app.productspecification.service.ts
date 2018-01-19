import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
   
export class ProductSpecificationService {
    constructor( private http: Http ) { }

    loadAllProductSpecifications(): Observable<any> {
        return this.http
            .post( "loadallproductspecifications.do", {} )
            .map(( res: Response ) => res.json() )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }
}

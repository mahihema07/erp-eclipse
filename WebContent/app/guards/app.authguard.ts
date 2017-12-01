import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AppConstants} from '../common/services/app.constants';

@Injectable()
export class AuthGuard implements CanActivate {

    formUrl = "loginGuard.do";

    constructor(private http: Http, private route: Router) {}

    canActivate(): Observable<boolean> {

        return this.http
            .post(this.formUrl, "")
            .map(res => {
                if (res.json()[AppConstants.RESPONSE_STATUS] === "SUCCESS") {
                    //this.route.navigate['/home'];
                    //console.log("redirecting to home...");
                    return true;
                } else {
                    document.getElementById( "openModalButton" ).click();
                    return false;
                }
            });
    }
}
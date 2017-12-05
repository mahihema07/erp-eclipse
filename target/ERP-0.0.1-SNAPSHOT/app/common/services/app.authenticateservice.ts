import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {ILoginModel} from '../../components/login/app.loginmodel';

@Injectable()
export class AuthenticateService {

    formUrl = "login.do";

    constructor(private http: Http, public router: Router) {}

    authenticateUser(values: ILoginModel): Observable<string> {

        return this.http
            .post(this.formUrl, values)
            .map((res: Response) => res.json());

    }
}



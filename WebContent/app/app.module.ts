import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';



//Routes
import {routes} from './app.routes';

//Guards
import {AuthGuard} from './guards/app.authguard';

import {AuthenticateService} from './common/services/app.authenticateservice';

//Components
import {AppComponent} from './app.component';
import {Home} from './components/home/app.home';
import {Registration} from './components/registration/app.registration';
import {ListBooks} from './components/books/app.listbooks';
import {RateBooks} from './components/books/app.ratebook';
import {StarRating} from './common/shared_components/app.starrating';


@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    declarations: [AppComponent, Home, Registration, ListBooks,
        RateBooks, StarRating],
    bootstrap: [AppComponent],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}, AuthGuard, AuthenticateService]
})
export class AppModule {}

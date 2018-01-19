import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { CurrencyConversionList } from './app.accounts.currencyconv.list';
import { CurrencyConversionCrud } from './app.accounts.currencyconv.crud';

const routes: Routes = [
    { path: 'list', component: CurrencyConversionList },
    { path: 'crud/:id', component: CurrencyConversionCrud }
]

@NgModule( {
    imports: [
        CommonModule, HttpModule, FormsModule, NgxPaginationModule, DataTableModule, RouterModule,
        RouterModule.forChild( routes, {
            useHash: true
        } )
    ],
    declarations: [
        CurrencyConversionList,
        CurrencyConversionCrud
    ]
} )
export class CurrencyConversionModule {
}
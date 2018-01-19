import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { CurrencyList } from './app.accounts.currency.list';
import { CurrencyCrud } from './app.accounts.currency.crud';

const routes: Routes = [
    { path: 'list', component: CurrencyList },
    { path: 'crud/:id', component: CurrencyCrud }
]

@NgModule( {
    imports: [
        CommonModule, HttpModule, FormsModule, NgxPaginationModule, DataTableModule, RouterModule,
        RouterModule.forChild( routes, {
            useHash: true
        } )
    ],
    declarations: [
        CurrencyList,
        CurrencyCrud
    ]
} )
export class CurrencyModule {
}
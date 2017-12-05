import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { ChartOfAccountsList } from './app.accounts.coa.list';
import { ChartOfAccountsCrud } from './app.accounts.coa.crud';

const routes: Routes = [
    { path: 'list', component: ChartOfAccountsList },
    { path: 'crud/:id', component: ChartOfAccountsCrud }
]

@NgModule( {
    imports: [
        CommonModule, HttpModule, FormsModule, NgxPaginationModule, DataTableModule, RouterModule,
        RouterModule.forChild( routes, {
            useHash: true
        } )
    ],
    declarations: [
        ChartOfAccountsList,
        ChartOfAccountsCrud
    ]
} )
export class ChartOfAccountsModule {
}
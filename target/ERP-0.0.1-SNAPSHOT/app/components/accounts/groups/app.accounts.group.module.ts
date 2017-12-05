import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { AccountGroupList } from './app.accounts.group.list';
import { AccountGroupCrud } from './app.accounts.group.crud';

const routes: Routes = [
    { path: 'list', component: AccountGroupList },
    { path: 'crud/:id', component: AccountGroupCrud }
]

@NgModule( {
    imports: [
        CommonModule, HttpModule, FormsModule, NgxPaginationModule, DataTableModule, RouterModule,
        RouterModule.forChild( routes, {
            useHash: true
        } )
    ],
    declarations: [
        AccountGroupList,
        AccountGroupCrud
    ]
} )
export class AccountGroupModule {
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { HotTableModule } from 'ng2-handsontable';

import { PurchaseList } from './app.purchase.list';
import { PurchaseCrud } from './app.purchase.crud';


const routes: Routes = [
    { path: 'list', component: PurchaseList },
    { path: 'crud/:id', component: PurchaseCrud }
]

@NgModule( {
    imports: [
        CommonModule, HttpModule, FormsModule, NgxPaginationModule, DataTableModule, RouterModule,HotTableModule,
        RouterModule.forChild( routes, {
            useHash: true
        } )
    ],
    declarations: [
        PurchaseList,
        PurchaseCrud
    ]
} )
export class PurchaseModule {
}
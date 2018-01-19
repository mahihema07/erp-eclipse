import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProductSpecificationList } from './app.productspecification.list';
import { ProductSpecificationCrud } from './app.productspecification.crud';

const routes: Routes = [
    { path: 'list', component: ProductSpecificationList },
    { path: 'crud/:id', component: ProductSpecificationCrud }
]

@NgModule( {
    imports: [
        CommonModule, HttpModule, FormsModule, NgxPaginationModule, DataTableModule, RouterModule,
        RouterModule.forChild( routes, {
            useHash: true
        } )
    ],
    declarations: [
        ProductSpecificationList,
        ProductSpecificationCrud
    ]
} )
export class ProductSpecificationModule {
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProductsList } from './app.products.component.list';
import { ProductsCrud } from './app.products.component.crud';

const routes: Routes = [
    { path: 'list', component: ProductsList },
    { path: 'crud/:id', component: ProductsCrud }
]

@NgModule( {
    imports: [
        CommonModule, HttpModule, FormsModule, NgxPaginationModule, DataTableModule, RouterModule,
        RouterModule.forChild( routes, {
            useHash: true
        } )
    ],
    declarations: [
        ProductsList,
        ProductsCrud
    ]
} )
export class ProductsModule {
}
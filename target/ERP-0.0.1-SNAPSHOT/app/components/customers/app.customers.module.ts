import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';


import { CustomersList } from './app.customers.list';
import { CustomersCrud } from './app.customers.crud';


const routes: Routes = [
    { path: 'list', component: CustomersList },
    { path: 'crud/:id', component: CustomersCrud }
]

@NgModule( {
    imports: [
        CommonModule, HttpModule, FormsModule, NgxPaginationModule, DataTableModule, RouterModule,
        RouterModule.forChild( routes, {
            useHash: true
        } )
    ],
    declarations: [
        CustomersList,
        CustomersCrud
    ]
} )
export class CustomersModule {
}
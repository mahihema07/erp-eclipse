import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { SpecificationList } from './app.specification.component.list';
import { SpecificationCrud } from './app.specification.component.crud';

const routes: Routes = [
    { path: 'list', component: SpecificationList },
    { path: 'crud/:id', component: SpecificationCrud }
]

@NgModule( {
    imports: [
        CommonModule, HttpModule, FormsModule, NgxPaginationModule, DataTableModule, RouterModule,
        RouterModule.forChild( routes, {
            useHash: true
        } )
    ],
    declarations: [
        SpecificationList,
        SpecificationCrud
    ]
} )
export class SpecificationComponentModule {
}
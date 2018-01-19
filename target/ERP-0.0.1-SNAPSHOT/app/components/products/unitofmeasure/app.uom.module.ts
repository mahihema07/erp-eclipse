import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { SpecificationUomList } from './app.specification.uom.list';
import { SpecificationUomCrud } from './app.specification.uom.crud';

const routes: Routes = [
    { path: 'list', component: SpecificationUomList },
    { path: 'crud/:id', component: SpecificationUomCrud }
]

@NgModule( {
    imports: [
        CommonModule, HttpModule, FormsModule, NgxPaginationModule, DataTableModule, RouterModule,
        RouterModule.forChild( routes )
    ],
    declarations: [
        SpecificationUomList,
        SpecificationUomCrud
    ]
} )
export class ProductSpecificationUomModule {
}
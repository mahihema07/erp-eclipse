/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Import our dependencies
import { Routes } from '@angular/router';
import { Home } from './components/home/app.home';
import { Registration } from './components/registration/app.registration';
import { ListBooks } from './components/books/app.listbooks';
import { RateBooks } from './components/books/app.ratebook';

import { AuthGuard } from './guards/app.authguard';

// Define which component should be loaded based on the current URL
export const routes: Routes = [
    { path: '', pathMatch: 'full',redirectTo: 'home' },
    {
        path: 'home', component: Home, canActivate: [AuthGuard],
        children: [
            { path: 'products', loadChildren: './app/components/products/productsmaster/app.products.module#ProductsModule', canActivate: [AuthGuard] },
            { path: 'category', loadChildren: './app/components/products/product_category/app.category.module#CategoryModule', canActivate: [AuthGuard] },
            { path: 'accountgroup', loadChildren: './app/components/accounts/groups/app.accounts.group.module#AccountGroupModule', canActivate: [AuthGuard] },
            { path: 'chartofaccounts', loadChildren: './app/components/accounts/chartofaccounts/app.accounts.coa.module#ChartOfAccountsModule', canActivate: [AuthGuard] },
            { path: 'specificatoncomponent', loadChildren: './app/components/products/specification_components/app.specification.module#SpecificationComponentModule', canActivate: [AuthGuard] },
            { path: 'productspecification', loadChildren: './app/components/products/product_specifications/app.productspecification.module#ProductSpecificationModule', canActivate: [AuthGuard] },
            { path: 'SpecificationUom', loadChildren: './app/components/products/unitofmeasure/app.uom.module#ProductSpecificationUomModule', canActivate: [AuthGuard] },
            { path: 'customers', loadChildren: './app/components/customers/app.customers.module#CustomersModule', canActivate: [AuthGuard] },
            { path: 'suppliers', loadChildren: './app/components/suppliers/app.suppliers.module#SuppliersModule', canActivate: [AuthGuard] },
            { path: 'currency', loadChildren: './app/components/accounts/currency/app.accounts.currency.module#CurrencyModule', canActivate: [AuthGuard] },
            { path: 'currencyconversion', loadChildren: './app/components/accounts/currencyconversion/app.accounts.currencyconv.module#CurrencyConversionModule', canActivate: [AuthGuard] },
            { path: 'purchase', loadChildren: './app/components/purchase/app.purchase.module#PurchaseModule', canActivate: [AuthGuard] },
            { path: 'stockadjust', loadChildren: './app/components/stockadjust/app.stockadjust.module#StockAdjustModule', canActivate: [AuthGuard] },
            { path: 'sales', loadChildren: './app/components/sales/app.sales.module#SalesModule', canActivate: [AuthGuard] },
            { path: 'accounting', loadChildren: './app/components/accounting/app.accounting.module#AccountingModule', canActivate: [AuthGuard] },
           
            ]
    },
    { path: 'registration', component: Registration },
    { path: 'listbooks', component: ListBooks, canActivate: [AuthGuard] },
    { path: 'ratebook/:id', component: RateBooks, canActivate: [AuthGuard] }
];

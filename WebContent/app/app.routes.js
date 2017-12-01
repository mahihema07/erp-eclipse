/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
System.register(["./components/home/app.home", "./components/registration/app.registration", "./components/books/app.listbooks", "./components/books/app.ratebook", "./guards/app.authguard"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_home_1, app_registration_1, app_listbooks_1, app_ratebook_1, app_authguard_1, routes;
    return {
        setters: [
            function (app_home_1_1) {
                app_home_1 = app_home_1_1;
            },
            function (app_registration_1_1) {
                app_registration_1 = app_registration_1_1;
            },
            function (app_listbooks_1_1) {
                app_listbooks_1 = app_listbooks_1_1;
            },
            function (app_ratebook_1_1) {
                app_ratebook_1 = app_ratebook_1_1;
            },
            function (app_authguard_1_1) {
                app_authguard_1 = app_authguard_1_1;
            }
        ],
        execute: function () {/*
             * To change this license header, choose License Headers in Project Properties.
             * To change this template file, choose Tools | Templates
             * and open the template in the editor.
             */
            // Define which component should be loaded based on the current URL
            exports_1("routes", routes = [
                { path: '', pathMatch: 'full', redirectTo: 'home' },
                {
                    path: 'home', component: app_home_1.Home, canActivate: [app_authguard_1.AuthGuard],
                    children: [
                        { path: 'products', loadChildren: './app/components/products/productsmaster/app.products.module#ProductsModule', canActivate: [app_authguard_1.AuthGuard] },
                        { path: 'category', loadChildren: './app/components/products/product_category/app.category.module#CategoryModule', canActivate: [app_authguard_1.AuthGuard] },
                        { path: 'accountgroup', loadChildren: './app/components/accounts/groups/app.accounts.group.module#AccountGroupModule', canActivate: [app_authguard_1.AuthGuard] },
                        { path: 'specificatoncomponent', loadChildren: './app/components/products/specification_components/app.specification.module#SpecificationComponentModule', canActivate: [app_authguard_1.AuthGuard] },
                        { path: 'productspecification', loadChildren: './app/components/products/product_specifications/app.productspecification.module#ProductSpecificationModule', canActivate: [app_authguard_1.AuthGuard] },
                        { path: 'SpecificationUom', loadChildren: './app/components/products/unitofmeasure/app.uom.module#ProductSpecificationUomModule', canActivate: [app_authguard_1.AuthGuard] },
                    ]
                },
                { path: 'registration', component: app_registration_1.Registration },
                { path: 'listbooks', component: app_listbooks_1.ListBooks, canActivate: [app_authguard_1.AuthGuard] },
                { path: 'ratebook/:id', component: app_ratebook_1.RateBooks, canActivate: [app_authguard_1.AuthGuard] }
            ]);
        }
    };
});
//# sourceMappingURL=app.routes.js.map
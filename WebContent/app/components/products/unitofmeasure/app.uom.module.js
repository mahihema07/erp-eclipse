System.register(["@angular/core", "@angular/common", "@angular/http", "@angular/forms", "@angular/router", "angular2-datatable", "ngx-pagination", "./app.specification.uom.list", "./app.specification.uom.crud"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, http_1, forms_1, router_1, angular2_datatable_1, ngx_pagination_1, app_specification_uom_list_1, app_specification_uom_crud_1, routes, ProductSpecificationUomModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_datatable_1_1) {
                angular2_datatable_1 = angular2_datatable_1_1;
            },
            function (ngx_pagination_1_1) {
                ngx_pagination_1 = ngx_pagination_1_1;
            },
            function (app_specification_uom_list_1_1) {
                app_specification_uom_list_1 = app_specification_uom_list_1_1;
            },
            function (app_specification_uom_crud_1_1) {
                app_specification_uom_crud_1 = app_specification_uom_crud_1_1;
            }
        ],
        execute: function () {
            routes = [
                { path: 'list', component: app_specification_uom_list_1.SpecificationUomList },
                { path: 'crud/:id', component: app_specification_uom_crud_1.SpecificationUomCrud }
            ];
            ProductSpecificationUomModule = /** @class */ (function () {
                function ProductSpecificationUomModule() {
                }
                ProductSpecificationUomModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule, http_1.HttpModule, forms_1.FormsModule, ngx_pagination_1.NgxPaginationModule, angular2_datatable_1.DataTableModule, router_1.RouterModule,
                            router_1.RouterModule.forChild(routes)
                        ],
                        declarations: [
                            app_specification_uom_list_1.SpecificationUomList,
                            app_specification_uom_crud_1.SpecificationUomCrud
                        ]
                    })
                ], ProductSpecificationUomModule);
                return ProductSpecificationUomModule;
            }());
            exports_1("ProductSpecificationUomModule", ProductSpecificationUomModule);
        }
    };
});
//# sourceMappingURL=app.uom.module.js.map
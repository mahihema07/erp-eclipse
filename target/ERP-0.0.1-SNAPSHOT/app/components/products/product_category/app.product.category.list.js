System.register(["@angular/core", "@angular/http", "@angular/router", "rxjs/add/operator/map", "../../../common/services/app.constants", "./services/app.category.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, router_1, app_constants_1, app_category_service_1, CategoryList;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {
            },
            function (app_constants_1_1) {
                app_constants_1 = app_constants_1_1;
            },
            function (app_category_service_1_1) {
                app_category_service_1 = app_category_service_1_1;
            }
        ],
        execute: function () {
            CategoryList = /** @class */ (function () {
                function CategoryList(http, route, router, formService) {
                    this.http = http;
                    this.route = route;
                    this.router = router;
                    this.formService = formService;
                    this.crudRoute = 'home/category/crud';
                    this.filterQuery = "";
                    this.rowsOnPage = 10;
                    this.activePage = 1;
                    this.itemsTotal = 0;
                    this.initialPageNo = 1;
                    this.sortOrder = 'asc';
                    this.show_throbber = false;
                    this.formLoadUrl = "loadproductsbypage.do";
                    this.modelDeleteUrl = "deleteProduct.do";
                }
                CategoryList.prototype.ngOnInit = function () {
                    this.loadDataByPage(this.initialPageNo);
                };
                CategoryList.prototype.backToHome = function () {
                    this.router.navigate(['/home']);
                };
                CategoryList.prototype.loadDataByPage = function (page) {
                    var _this = this;
                    var url = this.formLoadUrl; //+ "?pageNumber=" + page + "&rowsOnPage=" + this.rowsOnPage + "&statusFilter=" + this.searchFiltervalue + "&searchFilter=" + this.filterQuery;
                    var params = {
                        pageNumber: page,
                        rowsOnPage: this.rowsOnPage,
                        searchFilter: this.filterQuery
                    };
                    this.show_throbber = true;
                    this.formService.loadModelDataByPage(params)
                        .subscribe(function (data) {
                        if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                            document.getElementById("openModalButton").click();
                        }
                        else {
                            _this.listData = (data[app_constants_1.AppConstants.RESPONSE_DATA]);
                            _this.data = (data[app_constants_1.AppConstants.RESPONSE_DATA]);
                            _this.itemsTotal = data[app_constants_1.AppConstants.RESPONSE_DATA_COUNT];
                            _this.show_throbber = false;
                        }
                    }, function (err) {
                        _this.show_throbber = false;
                        console.log(err);
                    });
                };
                CategoryList.prototype.onPageChange = function (page) {
                    this.activePage = page;
                    this.loadDataByPage(page);
                };
                CategoryList.prototype.filterQueryChange = function (event) {
                    this.loadDataByPage(this.initialPageNo);
                };
                CategoryList.prototype.createNew = function () {
                    this.router.navigate([this.crudRoute, 0]);
                };
                CategoryList.prototype.deleteModel = function (id) {
                    var _this = this;
                    this.formService.deleteModel(id)
                        .subscribe(function (data) {
                        _this.show_throbber = false;
                        if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                            document.getElementById("openModalButton").click();
                        }
                        else {
                            alert(data[app_constants_1.AppConstants.RESPONSE_MESSAGE]);
                            _this.loadDataByPage(_this.initialPageNo);
                        }
                    }, function (err) {
                        _this.show_throbber = false;
                        console.log(err);
                    });
                };
                CategoryList = __decorate([
                    core_1.Component({
                        templateUrl: './app/components/products/product_category/category_list.html',
                        providers: [app_category_service_1.CategoryService]
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _c || Object, app_category_service_1.CategoryService])
                ], CategoryList);
                return CategoryList;
                var _a, _b, _c;
            }());
            exports_1("CategoryList", CategoryList);
        }
    };
});
//# sourceMappingURL=app.product.category.list.js.map
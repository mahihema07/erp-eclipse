System.register(["@angular/core", "@angular/http", "@angular/router", "rxjs/add/operator/map"], function (exports_1, context_1) {
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
    var core_1, http_1, router_1, SpecificationUomList;
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
            }
        ],
        execute: function () {
            SpecificationUomList = /** @class */ (function () {
                function SpecificationUomList(http, route, router) {
                    this.http = http;
                    this.route = route;
                    this.router = router;
                    this.filterQuery = "";
                    this.rowsOnPage = 10;
                    this.activePage = 1;
                    this.itemsTotal = 0;
                    this.initialPageNo = 1;
                    this.sortOrder = 'asc';
                    this.show_throbber = false;
                    this.formLoadUrl = "loadspecificationuombypage.do";
                    this.deleteUomDataByIdUrl = "deleteUomDataById.do";
                }
                SpecificationUomList.prototype.ngOnInit = function () {
                    this.loadDataByPage(this.initialPageNo);
                };
                SpecificationUomList.prototype.onPageChange = function (page) {
                    //this.rowsOnPage = event.rowsOnPage;
                    this.activePage = page;
                    this.loadDataByPage(page);
                };
                SpecificationUomList.prototype.createNew = function () {
                    this.router.navigate(['home/SpecificationUom/crud', 0]);
                };
                SpecificationUomList.prototype.filterQueryChange = function (event) {
                    this.loadDataByPage(this.initialPageNo);
                };
                SpecificationUomList.prototype.loadDataByPage = function (page) {
                    var _this = this;
                    var url = this.formLoadUrl; //+ "?pageNumber=" + page + "&rowsOnPage=" + this.rowsOnPage + "&statusFilter=" + this.searchFiltervalue + "&searchFilter=" + this.filterQuery;
                    var params = {
                        pageNumber: page,
                        rowsOnPage: this.rowsOnPage,
                        searchFilter: this.filterQuery
                    };
                    this.show_throbber = true;
                    this.http
                        .post(url, params)
                        .map(function (res) {
                        return res.json();
                    })
                        .subscribe(function (data) {
                        if (!data.IsAuthenticated) {
                            document.getElementById("openModalButton").click();
                        }
                        else {
                            _this.formdata = JSON.parse(data.data);
                            _this.data = JSON.parse(data.data);
                            _this.itemsTotal = data.count;
                            _this.show_throbber = false;
                        }
                    }, function (err) {
                        _this.show_throbber = false;
                        console.log(err);
                    });
                };
                SpecificationUomList.prototype.deleteFunc = function (uomdata) {
                    var _this = this;
                    this.http
                        .post(this.deleteUomDataByIdUrl, uomdata)
                        .map(function (res) {
                        return res.json();
                    }).subscribe(function (data) {
                        alert(data.status);
                        _this.loadDataByPage(_this.initialPageNo);
                    });
                };
                SpecificationUomList.prototype.cancelFunc = function () {
                    this.router.navigate(['home/SpecificationUom/list']);
                };
                SpecificationUomList = __decorate([
                    core_1.Component({
                        templateUrl: './app/components/products/unitofmeasure/uom_list.html' /*,
                        providers: [CategoriesService]*/
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _c || Object])
                ], SpecificationUomList);
                return SpecificationUomList;
                var _a, _b, _c;
            }());
            exports_1("SpecificationUomList", SpecificationUomList);
        }
    };
});
//# sourceMappingURL=app.specification.uom.list.js.map
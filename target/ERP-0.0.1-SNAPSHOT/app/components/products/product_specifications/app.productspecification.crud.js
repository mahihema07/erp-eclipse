System.register(["@angular/core", "@angular/http", "@angular/router", "rxjs/add/operator/map", "../../../common/services/app.constants", "../unitofmeasure/services/app.uom.service", "../specification_components/services/app.specification.service"], function (exports_1, context_1) {
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
    var core_1, http_1, router_1, app_constants_1, app_uom_service_1, app_specification_service_1, ProductSpecificationCrud;
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
            function (app_uom_service_1_1) {
                app_uom_service_1 = app_uom_service_1_1;
            },
            function (app_specification_service_1_1) {
                app_specification_service_1 = app_specification_service_1_1;
            }
        ],
        execute: function () {
            ProductSpecificationCrud = /** @class */ (function () {
                function ProductSpecificationCrud(http, route, router, uomService, specificationComponentService) {
                    this.http = http;
                    this.route = route;
                    this.router = router;
                    this.uomService = uomService;
                    this.specificationComponentService = specificationComponentService;
                    this.listRoute = 'home/productspecification/list';
                    this.loadDataByIdUrl = "loadProductSpecificationById.do";
                    this.submitFormUrl = "saveOrUpdateProductSpecification.do";
                    this.modelDeleteUrl = "deleteProductSpecification.do";
                }
                ProductSpecificationCrud.prototype.getBlankDataGrid = function () {
                    var specificationValue = 0;
                    var uomId = null;
                    var specificationComponentId = null;
                };
                ProductSpecificationCrud.prototype.ngOnInit = function () {
                    var _this = this;
                    this.route.params.subscribe(function (params) {
                        _this.show_throbber = true;
                        var id = params['id'];
                        _this.loadCombos();
                        if (id == 0) {
                            _this.formData = {};
                            _this.gridData = [];
                        }
                        else {
                            _this.loadFormData(id);
                        }
                        _this.show_throbber = false;
                    });
                };
                ProductSpecificationCrud.prototype.submitForm = function (data) {
                    var _this = this;
                    try {
                        this.show_throbber = true;
                        var params = {
                            headerData: this.formData,
                            gridData: this.gridData
                        };
                        this.http
                            .post(this.submitFormUrl, params)
                            .map(function (res) {
                            return res.json();
                        })
                            .subscribe(function (data) {
                            _this.show_throbber = false;
                            if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                                document.getElementById("openModalButton").click();
                            }
                            else {
                                alert(data[app_constants_1.AppConstants.RESPONSE_MESSAGE]);
                                if (data[app_constants_1.AppConstants.RESPONSE_STATUS] == app_constants_1.AppConstants.RESPONSE_STATUS_SUCCESS)
                                    _this.router.navigate([_this.listRoute]);
                            }
                        }, function (err) {
                            _this.show_throbber = false;
                            alert(err);
                            console.log(err);
                        });
                    }
                    catch (e) {
                        console.error(e);
                    }
                };
                ProductSpecificationCrud.prototype.backToHome = function () {
                    this.router.navigate([this.listRoute]);
                };
                ProductSpecificationCrud.prototype.loadFormData = function (id) {
                    var _this = this;
                    this.http
                        .post(this.loadDataByIdUrl, id)
                        .map(function (res) {
                        return res.json();
                    })
                        .subscribe(function (data) {
                        _this.show_throbber = false;
                        if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                            document.getElementById("openModalButton").click();
                        }
                        else {
                            var dataObj = (data[app_constants_1.AppConstants.RESPONSE_DATA]);
                            _this.formData = (dataObj.headerData);
                            _this.gridData = dataObj.detailData;
                        }
                    }, function (err) {
                        _this.show_throbber = false;
                        console.log(err);
                    });
                };
                ProductSpecificationCrud.prototype.loadCombos = function () {
                    var _this = this;
                    this.specificationComponentService.loadAllSpecificationComponents()
                        .subscribe(function (data) {
                        if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                            document.getElementById("openModalButton").click();
                        }
                        else {
                            var dataObj = JSON.parse(data[app_constants_1.AppConstants.RESPONSE_DATA]);
                            _this.specificationComponents = dataObj;
                        }
                    }, function (err) {
                        alert(err);
                        console.log(err);
                    });
                    //Loading uom
                    this.uomService.loadAllUoms()
                        .subscribe(function (data) {
                        if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                            document.getElementById("openModalButton").click();
                        }
                        else {
                            if (data[app_constants_1.AppConstants.RESPONSE_STATUS] == app_constants_1.AppConstants.RESPONSE_STATUS_SUCCESS) {
                                var dataObj = (data[app_constants_1.AppConstants.RESPONSE_DATA]);
                                _this.uom = dataObj;
                            }
                            else {
                                alert(data[app_constants_1.AppConstants.RESPONSE_MESSAGE]);
                            }
                        }
                    }, function (err) {
                        alert(err);
                        console.log(err);
                    });
                };
                ProductSpecificationCrud.prototype.addRows = function () {
                    this.gridData.push(new this.getBlankDataGrid());
                };
                ProductSpecificationCrud.prototype.removeRow = function (item, index) {
                    this.gridData.splice(index, 1);
                };
                ProductSpecificationCrud.prototype.deleteModel = function (id) {
                    var _this = this;
                    this.http
                        .post(this.modelDeleteUrl, id)
                        .map(function (res) {
                        return res.json();
                    })
                        .subscribe(function (data) {
                        _this.show_throbber = false;
                        if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                            document.getElementById("openModalButton").click();
                        }
                        else {
                            alert(data[app_constants_1.AppConstants.RESPONSE_MESSAGE]);
                            if (data[app_constants_1.AppConstants.RESPONSE_STATUS] == app_constants_1.AppConstants.RESPONSE_STATUS_SUCCESS)
                                _this.router.navigate([_this.listRoute]);
                        }
                    }, function (err) {
                        _this.show_throbber = false;
                        console.log(err);
                    });
                };
                ProductSpecificationCrud.prototype.isValidForm = function () {
                    return true;
                };
                ProductSpecificationCrud = __decorate([
                    core_1.Component({
                        templateUrl: './app/components/products/product_specifications/productspecification_crud.html',
                        providers: [app_uom_service_1.UomService, app_specification_service_1.SpecificationComponentService]
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _c || Object, app_uom_service_1.UomService, app_specification_service_1.SpecificationComponentService])
                ], ProductSpecificationCrud);
                return ProductSpecificationCrud;
                var _a, _b, _c;
            }());
            exports_1("ProductSpecificationCrud", ProductSpecificationCrud);
        }
    };
});
//# sourceMappingURL=app.productspecification.crud.js.map
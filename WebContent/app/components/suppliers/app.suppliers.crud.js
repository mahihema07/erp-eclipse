System.register(["@angular/core", "@angular/http", "@angular/router", "rxjs/add/operator/map", "../../common/services/app.constants", "./services/app.suppliers.service", "../accounts/chartofaccounts/services/app.coa.service"], function (exports_1, context_1) {
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
    var core_1, http_1, router_1, app_constants_1, app_suppliers_service_1, app_coa_service_1, SuppliersCrud;
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
            function (app_suppliers_service_1_1) {
                app_suppliers_service_1 = app_suppliers_service_1_1;
            },
            function (app_coa_service_1_1) {
                app_coa_service_1 = app_coa_service_1_1;
            }
        ],
        execute: function () {
            SuppliersCrud = /** @class */ (function () {
                function SuppliersCrud(http, route, router, formService, coaservice) {
                    this.http = http;
                    this.route = route;
                    this.router = router;
                    this.formService = formService;
                    this.coaservice = coaservice;
                    this.listRoute = 'home/suppliers/list';
                }
                SuppliersCrud.prototype.getBlankGridData = function () {
                    var lineA;
                    var lineb;
                    var city;
                    var state;
                    var country;
                    var zip;
                    var primephone;
                    var secondphone;
                    var primemail;
                    var secondenail;
                    var website;
                };
                SuppliersCrud.prototype.ngOnInit = function () {
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
                SuppliersCrud.prototype.submitForm = function (data) {
                    var _this = this;
                    try {
                        this.show_throbber = true;
                        var params = {
                            headerData: this.formData,
                            gridData: this.gridData
                        };
                        this.formService.submitModel(params)
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
                SuppliersCrud.prototype.loadFormData = function (id) {
                    var _this = this;
                    this.formService.loadModelDataById(id)
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
                        alert(err);
                        console.log(err);
                    });
                };
                SuppliersCrud.prototype.loadCombos = function () {
                    var _this = this;
                    this.coaservice.loadAllModelData()
                        .subscribe(function (data) {
                        if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                            document.getElementById("openModalButton").click();
                        }
                        else {
                            if (data[app_constants_1.AppConstants.RESPONSE_STATUS] == app_constants_1.AppConstants.RESPONSE_STATUS_SUCCESS) {
                                var dataObj = (data[app_constants_1.AppConstants.RESPONSE_DATA]);
                                _this.coadata = dataObj;
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
                SuppliersCrud.prototype.backToHome = function () {
                    this.router.navigate([this.listRoute]);
                };
                SuppliersCrud.prototype.addRows = function () {
                    this.gridData.push(new this.getBlankGridData());
                };
                SuppliersCrud.prototype.removeRow = function (item, index) {
                    this.gridData.splice(index, 1);
                };
                SuppliersCrud.prototype.deleteModel = function (id) {
                    var _this = this;
                    this.formService.deleteModel(id)
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
                };
                SuppliersCrud.prototype.isValidForm = function () {
                    return true;
                };
                SuppliersCrud = __decorate([
                    core_1.Component({
                        templateUrl: './app/components/suppliers/suppliers_crud.html',
                        providers: [app_suppliers_service_1.SupplierService, app_coa_service_1.ChartOfAccountsService]
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _c || Object, app_suppliers_service_1.SupplierService, app_coa_service_1.ChartOfAccountsService])
                ], SuppliersCrud);
                return SuppliersCrud;
                var _a, _b, _c;
            }());
            exports_1("SuppliersCrud", SuppliersCrud);
        }
    };
});
//# sourceMappingURL=app.suppliers.crud.js.map
System.register(["@angular/core", "@angular/http", "@angular/router", "rxjs/add/operator/map", "../../common/services/app.constants", "./services/app.accounting.service", "../accounts/chartofaccounts/services/app.coa.service", "../accounts/groups/services/app.groups.service"], function (exports_1, context_1) {
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
    var core_1, http_1, router_1, app_constants_1, app_accounting_service_1, app_coa_service_1, app_groups_service_1, AccountingCrud;
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
            function (app_accounting_service_1_1) {
                app_accounting_service_1 = app_accounting_service_1_1;
            },
            function (app_coa_service_1_1) {
                app_coa_service_1 = app_coa_service_1_1;
            },
            function (app_groups_service_1_1) {
                app_groups_service_1 = app_groups_service_1_1;
            }
        ],
        execute: function () {
            AccountingCrud = /** @class */ (function () {
                function AccountingCrud(http, route, router, formService, accountservice, groupservice) {
                    this.http = http;
                    this.route = route;
                    this.router = router;
                    this.formService = formService;
                    this.accountservice = accountservice;
                    this.groupservice = groupservice;
                }
                AccountingCrud.prototype.ngOnInit = function () {
                    this.loadDataByPage();
                    this.loadcombo();
                    this.show_throbber = false;
                };
                AccountingCrud.prototype.loadDataByPage = function () {
                    var _this = this;
                    this.show_throbber = true;
                    this.formService.loadModelDataByPage()
                        .subscribe(function (data) {
                        if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                            document.getElementById("openModalButton").click();
                        }
                        else {
                            _this.formdata = (data[app_constants_1.AppConstants.RESPONSE_DATA]);
                            _this.data = (data[app_constants_1.AppConstants.RESPONSE_DATA]);
                            _this.show_throbber = false;
                        }
                    }, function (err) {
                        _this.show_throbber = false;
                        console.log(err);
                    });
                };
                AccountingCrud.prototype.loadcombo = function () {
                    var _this = this;
                    this.accountservice.loadAllModelData()
                        .subscribe(function (data) {
                        if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                            document.getElementById("openModalButton").click();
                        }
                        else {
                            if (data[app_constants_1.AppConstants.RESPONSE_STATUS] == app_constants_1.AppConstants.RESPONSE_STATUS_SUCCESS) {
                                var dataObj = (data[app_constants_1.AppConstants.RESPONSE_DATA]);
                                _this.accountdata = dataObj;
                            }
                            else {
                                alert(data[app_constants_1.AppConstants.RESPONSE_MESSAGE]);
                            }
                        }
                    }, function (err) {
                        alert(err);
                        console.log(err);
                    });
                    this.groupservice.loadAllModelData()
                        .subscribe(function (data) {
                        if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                            document.getElementById("openModalButton").click();
                        }
                        else {
                            if (data[app_constants_1.AppConstants.RESPONSE_STATUS] == app_constants_1.AppConstants.RESPONSE_STATUS_SUCCESS) {
                                var dataObj = (data[app_constants_1.AppConstants.RESPONSE_DATA]);
                                _this.groupdata = dataObj;
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
                AccountingCrud.prototype.submitForm = function (data) {
                    var _this = this;
                    try {
                        this.show_throbber = true;
                        var params = {
                            headerData: this.formdata,
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
                                    _this.loadDataByPage();
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
                AccountingCrud.prototype.deleteModel = function (id) {
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
                                _this.loadDataByPage();
                        }
                    }, function (err) {
                        _this.show_throbber = false;
                        alert(err);
                        console.log(err);
                    });
                };
                AccountingCrud.prototype.isValidForm = function () {
                    return true;
                };
                AccountingCrud = __decorate([
                    core_1.Component({
                        templateUrl: './app/components/accounting/crud_accountingdefaults.html',
                        providers: [app_accounting_service_1.AcountingService, app_coa_service_1.ChartOfAccountsService, app_groups_service_1.AccountGroupService]
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _c || Object, app_accounting_service_1.AcountingService, app_coa_service_1.ChartOfAccountsService,
                        app_groups_service_1.AccountGroupService])
                ], AccountingCrud);
                return AccountingCrud;
                var _a, _b, _c;
            }());
            exports_1("AccountingCrud", AccountingCrud);
        }
    };
});
//# sourceMappingURL=app.accounting.crud.js.map
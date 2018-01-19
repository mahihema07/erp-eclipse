System.register(["@angular/core", "@angular/http", "@angular/router", "rxjs/add/operator/map", "../../../common/services/app.constants"], function (exports_1, context_1) {
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
    var core_1, http_1, router_1, app_constants_1, SpecificationCrud;
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
            }
        ],
        execute: function () {
            SpecificationCrud = /** @class */ (function () {
                function SpecificationCrud(http, route, router) {
                    this.http = http;
                    this.route = route;
                    this.router = router;
                    this.loadDataByIdUrl = "loadSpecificationComponentById.do";
                    this.submitFormUrl = "saveOrUpdateSpecificationComponent.do";
                    this.modelDeleteUrl = "deleteSpecificationComponent.do";
                }
                SpecificationCrud.prototype.ngOnInit = function () {
                    var _this = this;
                    this.route.params.subscribe(function (params) {
                        _this.show_throbber = true;
                        var id = params['id'];
                        if (id == 0) {
                            _this.specificationComponent = {};
                        }
                        else {
                            _this.http
                                .post(_this.loadDataByIdUrl, id)
                                .map(function (res) {
                                return res.json();
                            }).subscribe(function (data) {
                                _this.specificationComponent = JSON.parse(data[app_constants_1.AppConstants.RESPONSE_DATA]);
                                //this.previousFormValues = JSON.parse(JSON.stringify(data));
                            });
                        }
                        _this.show_throbber = false;
                    });
                };
                SpecificationCrud.prototype.submitForm = function (data) {
                    var _this = this;
                    try {
                        this.show_throbber = true;
                        this.http
                            .post(this.submitFormUrl, data)
                            .map(function (res) {
                            return res.json();
                        })
                            .subscribe(function (data) {
                            if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                                document.getElementById("openModalButton").click();
                            }
                            else {
                                alert(data[app_constants_1.AppConstants.RESPONSE_MESSAGE]);
                                _this.show_throbber = false;
                                _this.router.navigate(['home/specificatoncomponent/list']);
                            }
                        }, function (err) {
                            _this.show_throbber = false;
                            console.log(err);
                        });
                    }
                    catch (e) {
                        console.error(e);
                    }
                };
                SpecificationCrud.prototype.backToHome = function () {
                    this.router.navigate(['home/specificatoncomponent/list']);
                };
                SpecificationCrud.prototype.deleteModel = function (id) {
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
                            _this.router.navigate(['home/specificatoncomponent/list']);
                        }
                    }, function (err) {
                        _this.show_throbber = false;
                        console.log(err);
                    });
                };
                SpecificationCrud = __decorate([
                    core_1.Component({
                        templateUrl: './app/components/products/specification_components/specification_crud.html' /*,
                        providers: [CategoriesService]*/
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _c || Object])
                ], SpecificationCrud);
                return SpecificationCrud;
                var _a, _b, _c;
            }());
            exports_1("SpecificationCrud", SpecificationCrud);
        }
    };
});
//# sourceMappingURL=app.specification.component.crud.js.map
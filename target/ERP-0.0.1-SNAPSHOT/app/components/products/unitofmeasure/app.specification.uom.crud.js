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
    var core_1, http_1, router_1, SpecificationUomCrud;
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
            SpecificationUomCrud = /** @class */ (function () {
                function SpecificationUomCrud(http, route, router) {
                    this.http = http;
                    this.route = route;
                    this.router = router;
                    this.loadSpecificationUomCrud = "loadSpecificationUomCrudPageById.do";
                    this.saveUomDataByIdUrl = "saveUomDataById.do";
                    this.deleteUomDataByIdUrl = "deleteUomDataById.do";
                }
                SpecificationUomCrud.prototype.ngOnInit = function () {
                    var _this = this;
                    this.route.params.subscribe(function (params) {
                        _this.show_throbber = true;
                        var id = params['id'];
                        _this.loadSpecificationUom(id);
                    });
                    this.show_throbber = false;
                };
                SpecificationUomCrud.prototype.loadSpecificationUom = function (id) {
                    var _this = this;
                    this.route.params.subscribe(function (params) {
                        var id = params['id'];
                        if (id == 0) {
                            _this.griddata = {};
                        }
                        else {
                            _this.http
                                .post(_this.loadSpecificationUomCrud, id)
                                .map(function (res) {
                                return res.json();
                            }).subscribe(function (data) {
                                _this.griddata = JSON.parse(data.data);
                            });
                        }
                    });
                };
                SpecificationUomCrud.prototype.submitForm = function (formdata) {
                    var _this = this;
                    this.http
                        .post(this.saveUomDataByIdUrl, formdata)
                        .map(function (res) {
                        return res.json();
                    }).subscribe(function (data) {
                        _this.specificationUom = JSON.parse(data.data);
                        alert("succes");
                        _this.router.navigate(['home/SpecificationUom/list']);
                    }, function (err) {
                        console.log(err);
                    });
                };
                SpecificationUomCrud.prototype.deleteFunc = function (uomdata) {
                    var _this = this;
                    this.http
                        .post(this.deleteUomDataByIdUrl, uomdata)
                        .map(function (res) {
                        return res.json();
                    }).subscribe(function (data) {
                        alert("succes");
                        _this.router.navigateByUrl('home/SpecificationUom/list');
                    });
                };
                SpecificationUomCrud.prototype.cancelFunc = function () {
                    this.router.navigate(['home/SpecificationUom/list']);
                };
                SpecificationUomCrud = __decorate([
                    core_1.Component({
                        templateUrl: './app/components/products/unitofmeasure/uom_crud.html' /*,
                        providers: [CategoriesService]*/
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _c || Object])
                ], SpecificationUomCrud);
                return SpecificationUomCrud;
                var _a, _b, _c;
            }());
            exports_1("SpecificationUomCrud", SpecificationUomCrud);
        }
    };
});
//# sourceMappingURL=app.specification.uom.crud.js.map
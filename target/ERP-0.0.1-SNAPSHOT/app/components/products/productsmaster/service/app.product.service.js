System.register(["@angular/core", "@angular/http", "rxjs/Rx", "rxjs/add/operator/map", "rxjs/add/operator/catch"], function (exports_1, context_1) {
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
    var core_1, http_1, Rx_1, ProductsService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {
            },
            function (_2) {
            }
        ],
        execute: function () {
            ProductsService = /** @class */ (function () {
                function ProductsService(http) {
                    this.http = http;
                    this.loadDataByIdUrl = "loadProductById.do";
                    this.submitFormUrl = "saveOrUpdateProduct.do";
                    this.modelDeleteUrl = "deleteProduct.do";
                    this.loadDataAllUrl = "loadAllProducts.do";
                    this.loadDataByPageUrl = "loadproductsbypage.do";
                    this.loadDataAllProductUrl = "loadallproductspecforpurchase.do";
                }
                ProductsService.prototype.loadAllModelData = function () {
                    return this.http
                        .post(this.loadDataAllUrl, {})
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                ProductsService.prototype.loadModelDataById = function (id) {
                    return this.http
                        .post(this.loadDataByIdUrl, id)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                ProductsService.prototype.loadModelDataByPage = function (params) {
                    return this.http
                        .post(this.loadDataByPageUrl, params)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                ProductsService.prototype.submitModel = function (params) {
                    return this.http
                        .post(this.submitFormUrl, params)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                ProductsService.prototype.deleteModel = function (id) {
                    return this.http
                        .post(this.modelDeleteUrl, id)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                //loading for product specification in purchase
                ProductsService.prototype.loadAllProductData = function () {
                    return this.http
                        .post(this.loadDataAllProductUrl, {})
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                ProductsService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
                ], ProductsService);
                return ProductsService;
                var _a;
            }());
            exports_1("ProductsService", ProductsService);
        }
    };
});
//# sourceMappingURL=app.product.service.js.map
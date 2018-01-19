System.register(["@angular/core", "@angular/http", "@angular/router", "rxjs/add/operator/map", "../../common/services/app.constants", "./services/app.sales.service", "../products/productsmaster/service/app.product.service", "../customers/services/app.customers.service"], function (exports_1, context_1) {
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
    var core_1, http_1, router_1, app_constants_1, app_sales_service_1, app_product_service_1, app_customers_service_1, SalesCrud;
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
            function (app_sales_service_1_1) {
                app_sales_service_1 = app_sales_service_1_1;
            },
            function (app_product_service_1_1) {
                app_product_service_1 = app_product_service_1_1;
            },
            function (app_customers_service_1_1) {
                app_customers_service_1 = app_customers_service_1_1;
            }
        ],
        execute: function () {
            SalesCrud = /** @class */ (function () {
                function SalesCrud(http, route, router, formService, customerService, productservice) {
                    this.http = http;
                    this.route = route;
                    this.router = router;
                    this.formService = formService;
                    this.customerService = customerService;
                    this.productservice = productservice;
                    this.listRoute = 'home/sales/list';
                    this.tablename = 'sales';
                }
                SalesCrud.prototype.getBlankGridData = function () {
                    var producthdrid;
                    var productdtlid;
                    var quantity;
                    var rate;
                    var totalprice;
                };
                SalesCrud.prototype.ngOnInit = function () {
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
                SalesCrud.prototype.submitForm = function (data) {
                    var _this = this;
                    try {
                        this.show_throbber = true;
                        var params = {
                            headerData: this.formData,
                            gridData: this.gridData,
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
                //stock entry
                /*
                    submitStock(data : any) {
                        
                       
                        var params = {
                                headerData: this.formData,
                                gridData: this.gridData,
                                tablename:this.tablename,
                                hdrid:this.hdrid,
                                stockhdrid:this.stockhdrid
                            }
                        this.stockservice.submitModel( params)
                        .subscribe( data => {
                            this.show_throbber = false;
            
                            if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                                document.getElementById( "openModalButton" ).click();
                            } else {
                                alert( data[AppConstants.RESPONSE_MESSAGE] );
                                if ( data[AppConstants.RESPONSE_STATUS] == AppConstants.RESPONSE_STATUS_SUCCESS )
                                    this.router.navigate( [this.listRoute] );
                            }
                        },
                        err => {
                            this.show_throbber = false;
                            alert( err );
                            console.log( err );
                        } );
                        
                        
                    }
            
                    loadStockById( id: string ) {
                        
                        this.stockservice.loadModelDataById( id )
                        .subscribe( data => {
                            this.show_throbber = false;
                            if ( !data[AppConstants.IS_AUTHENTICATED] ) {
                                document.getElementById( "openModalButton" ).click();
                            } else {
                                var dataObj = ( data[AppConstants.RESPONSE_DATA] );
                                this.stockhdrid = ( dataObj.headerData );
                               
                               
                            }
                        },
                        err => {
                            this.show_throbber = false;
                            alert( err );
                            console.log( err );
                        } );
                        
            
                    }
              */
                SalesCrud.prototype.loadFormData = function (id) {
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
                SalesCrud.prototype.loadCombos = function () {
                    //load all customer
                    var _this = this;
                    this.customerService.loadAllModelData()
                        .subscribe(function (data) {
                        if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                            document.getElementById("openModalButton").click();
                        }
                        else {
                            if (data[app_constants_1.AppConstants.RESPONSE_STATUS] == app_constants_1.AppConstants.RESPONSE_STATUS_SUCCESS) {
                                var dataObj = (data[app_constants_1.AppConstants.RESPONSE_DATA]);
                                _this.customer = dataObj;
                            }
                            else {
                                alert(data[app_constants_1.AppConstants.RESPONSE_MESSAGE]);
                            }
                        }
                    }, function (err) {
                        alert(err);
                        console.log(err);
                    });
                    //product hdr combo
                    this.productservice.loadAllModelData()
                        .subscribe(function (data) {
                        if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                            document.getElementById("openModalButton").click();
                        }
                        else {
                            if (data[app_constants_1.AppConstants.RESPONSE_STATUS] == app_constants_1.AppConstants.RESPONSE_STATUS_SUCCESS) {
                                var dataObj = (data[app_constants_1.AppConstants.RESPONSE_DATA]);
                                _this.producthdr = dataObj;
                            }
                            else {
                                alert(data[app_constants_1.AppConstants.RESPONSE_MESSAGE]);
                            }
                        }
                    }, function (err) {
                        alert(err);
                        console.log(err);
                    });
                    //load product specification
                    this.productservice.loadAllProductData()
                        .subscribe(function (data) {
                        if (!data[app_constants_1.AppConstants.IS_AUTHENTICATED]) {
                            document.getElementById("openModalButton").click();
                        }
                        else {
                            if (data[app_constants_1.AppConstants.RESPONSE_STATUS] == app_constants_1.AppConstants.RESPONSE_STATUS_SUCCESS) {
                                var dataObj = (data[app_constants_1.AppConstants.RESPONSE_DATA]);
                                _this.specificationlist = dataObj;
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
                SalesCrud.prototype.backToHome = function () {
                    this.router.navigate([this.listRoute]);
                };
                SalesCrud.prototype.addRows = function () {
                    this.gridData.push(new this.getBlankGridData());
                };
                SalesCrud.prototype.removeRow = function (item, index) {
                    this.gridData.splice(index, 1);
                };
                SalesCrud.prototype.deleteModel = function (id) {
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
                SalesCrud.prototype.isValidForm = function () {
                    return true;
                };
                SalesCrud = __decorate([
                    core_1.Component({
                        templateUrl: './app/components/sales/sales_crud.html',
                        providers: [app_sales_service_1.SalesService, app_customers_service_1.CustomerService, app_product_service_1.ProductsService]
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _c || Object, app_sales_service_1.SalesService, app_customers_service_1.CustomerService,
                        app_product_service_1.ProductsService])
                ], SalesCrud);
                return SalesCrud;
                var _a, _b, _c;
            }());
            exports_1("SalesCrud", SalesCrud);
        }
    };
});
//# sourceMappingURL=app.sales.crud.js.map
System.register(["@angular/core", "@angular/http", "@angular/router"], function (exports_1, context_1) {
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
    var core_1, http_1, router_1, RateBooks;
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
            }
        ],
        execute: function () {
            RateBooks = /** @class */ (function () {
                function RateBooks(http, route, router) {
                    this.http = http;
                    this.route = route;
                    this.router = router;
                    this.formUrl = "ratebooks.do";
                }
                RateBooks.prototype.ngOnInit = function () {
                    //let id = this.route.snapshot.params['id'];
                    var _this = this;
                    this.route.params.subscribe(function (params) {
                        var id = params['id'];
                        _this.http
                            .post(_this.formUrl, id)
                            .map(function (res) {
                            return res.json();
                        }).subscribe(function (data) {
                            _this.book = data;
                        });
                        // Retrieve Pet with Id route param
                        //this.petService.findPetById(id).subscribe(dog => this.dog = dog);
                    });
                };
                RateBooks.prototype.submitRate = function (values) {
                    this.http
                        .post('submitreview.do', values)
                        .map(function (res) {
                        // If request fails, throw an Error that will be caught
                        if (res.status < 200 || res.status >= 300) {
                            throw new Error('This request has failed ' + res.status);
                        }
                        else {
                            return res.json();
                        }
                    })
                        .subscribe(function (data) {
                        if (data.status === "success") {
                            alert(data.message);
                        }
                        else {
                            alert(data.message);
                        }
                    }, function (error) {
                        console.log(JSON.stringify(error.json()));
                    });
                };
                RateBooks.prototype.backToList = function () {
                    this.router.navigate(['/listbooks']);
                };
                RateBooks = __decorate([
                    core_1.Component({
                        templateUrl: './app/components/books/ratebook.html'
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _c || Object])
                ], RateBooks);
                return RateBooks;
                var _a, _b, _c;
            }());
            exports_1("RateBooks", RateBooks);
        }
    };
});
//# sourceMappingURL=app.ratebook.js.map
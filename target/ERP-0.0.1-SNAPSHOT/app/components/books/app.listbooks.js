System.register(["@angular/core", "@angular/http"], function (exports_1, context_1) {
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
    var core_1, http_1, ListBooks;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }
        ],
        execute: function () {
            ListBooks = /** @class */ (function () {
                function ListBooks(http) {
                    this.http = http;
                    this.formUrl = "listbooks.do";
                }
                ListBooks.prototype.ngOnInit = function () {
                    this.getBooks();
                };
                ListBooks.prototype.getBooks = function () {
                    var _this = this;
                    this.http
                        .post(this.formUrl, "")
                        .map(function (res) {
                        return res.json();
                    }).subscribe(function (data) {
                        _this.books = data;
                    });
                };
                ListBooks = __decorate([
                    core_1.Component({
                        templateUrl: './app/components/books/listbooks.html'
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
                ], ListBooks);
                return ListBooks;
                var _a;
            }());
            exports_1("ListBooks", ListBooks);
        }
    };
});
//# sourceMappingURL=app.listbooks.js.map
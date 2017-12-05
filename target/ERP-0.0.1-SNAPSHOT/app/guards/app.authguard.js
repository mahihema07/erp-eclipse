System.register(["@angular/core", "@angular/http", "@angular/router", "../common/services/app.constants"], function (exports_1, context_1) {
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
    var core_1, http_1, router_1, app_constants_1, AuthGuard;
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
            function (app_constants_1_1) {
                app_constants_1 = app_constants_1_1;
            }
        ],
        execute: function () {
            AuthGuard = (function () {
                function AuthGuard(http, route) {
                    this.http = http;
                    this.route = route;
                    this.formUrl = "loginGuard.do";
                }
                AuthGuard.prototype.canActivate = function () {
                    return this.http
                        .post(this.formUrl, "")
                        .map(function (res) {
                        if (res.json()[app_constants_1.AppConstants.RESPONSE_STATUS] === "SUCCESS") {
                            //this.route.navigate['/home'];
                            //console.log("redirecting to home...");
                            return true;
                        }
                        else {
                            document.getElementById("openModalButton").click();
                            return false;
                        }
                    });
                };
                AuthGuard = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
                ], AuthGuard);
                return AuthGuard;
                var _a, _b;
            }());
            exports_1("AuthGuard", AuthGuard);
        }
    };
});
//# sourceMappingURL=app.authguard.js.map
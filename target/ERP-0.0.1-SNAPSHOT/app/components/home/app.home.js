System.register(["@angular/core", "../../common/services/app.authenticateservice"], function (exports_1, context_1) {
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
    var core_1, app_authenticateservice_1, Home;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_authenticateservice_1_1) {
                app_authenticateservice_1 = app_authenticateservice_1_1;
            }
        ],
        execute: function () {
            Home = /** @class */ (function () {
                function Home(authService) {
                    this.authService = authService;
                }
                Home.prototype.ngOnInit = function () {
                    //this.showLogin();
                };
                Home.prototype.showLogin = function () {
                    try {
                        document.getElementById("openModalButton").click();
                    }
                    catch (e) {
                        console.log(e);
                    }
                };
                Home = __decorate([
                    core_1.Component({
                        templateUrl: './app/components/home/home.html'
                    }),
                    __metadata("design:paramtypes", [app_authenticateservice_1.AuthenticateService])
                ], Home);
                return Home;
            }());
            exports_1("Home", Home);
        }
    };
});
//# sourceMappingURL=app.home.js.map
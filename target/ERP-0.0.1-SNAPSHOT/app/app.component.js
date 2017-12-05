System.register(["@angular/core", "@angular/router", "./models/loginmodel", "./common/services/app.authenticateservice", "./common/services/app.constants"], function (exports_1, context_1) {
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
    var core_1, router_1, loginmodel_1, app_authenticateservice_1, app_constants_1, AppComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (loginmodel_1_1) {
                loginmodel_1 = loginmodel_1_1;
            },
            function (app_authenticateservice_1_1) {
                app_authenticateservice_1 = app_authenticateservice_1_1;
            },
            function (app_constants_1_1) {
                app_constants_1 = app_constants_1_1;
            }
        ],
        execute: function () {
            AppComponent = (function () {
                function AppComponent(router, authService, route) {
                    this.router = router;
                    this.authService = authService;
                    this.route = route;
                    this.loginModel = new loginmodel_1.LoginModel();
                }
                AppComponent.prototype.ngOnInit = function () {
                    /*if("/"===this.router.url){
                        this.router.navigate( ['/home'] );
                    }*/
                };
                AppComponent.prototype.doLogin = function () {
                    var _this = this;
                    var values = this.loginModel;
                    this.authService.authenticateUser(values).subscribe(function (data) {
                        _this.data = data;
                        if (_this.data[app_constants_1.AppConstants.RESPONSE_STATUS] === app_constants_1.AppConstants.RESPONSE_STATUS_SUCCESS) {
                            document.getElementById("openModalButton").click();
                            _this.router.navigate(['/home']);
                        }
                        else {
                            alert(_this.data[app_constants_1.AppConstants.RESPONSE_MESSAGE]);
                        }
                    }, function (error) { return _this.errormessage = error; });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'pm-app',
                        template: "\n    <link href=\"./admindashstyles/vendor/loginmodal.css\"\n    rel=\"stylesheet\" type=\"text/css\">\n         <div>\n            <!-- Our components will be loaded here based on the current URL -->\n            <button id=\"openModalButton\" [hidden]=\"true\" data-toggle=\"modal\"\n            data-target=\"#login-modal\">Open Modal</button>\n        <a href=\"#\" data-toggle=\"modal\" data-target=\"#login-modal\"></a>\n        <div class=\"modal fade\" id=\"login-modal\" tabindex=\"-1\" role=\"dialog\"\n            data-keyboard=\"false\" data-backdrop=\"static\"\n            aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"\n            style=\"display: none;\">\n            <div class=\"modal-dialog\">\n                <div class=\"loginmodal-container\">\n                    <h1>Login to Your Account</h1>\n                    <br>\n                    <form>\n                        <input type=\"text\" name=\"user\" placeholder=\"Username\"\n                            [(ngModel)]=\"loginModel.username\"> <input type=\"password\"\n                            name=\"pass\" placeholder=\"Password\"\n                            [(ngModel)]=\"loginModel.password\"> <input type=\"submit\"\n                            name=\"login\" class=\"login loginmodal-submit\" value=\"Login\"\n                            (click)=\"doLogin()\">\n                    </form>\n\n                    <div class=\"login-help\">\n                        <a href=\"#\">Register</a> - <a href=\"#\">Forgot Password</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n            <router-outlet></router-outlet>\n         </div>\n    "
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, app_authenticateservice_1.AuthenticateService, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object])
                ], AppComponent);
                return AppComponent;
                var _a, _b;
            }());
            exports_1("AppComponent", AppComponent);
        }
    };
});
//# sourceMappingURL=app.component.js.map
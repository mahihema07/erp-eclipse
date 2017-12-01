System.register(["@angular/core", "@angular/http", "@angular/router", "rxjs/add/operator/map", "rxjs/add/operator/catch", "./app.registration.model"], function (exports_1, context_1) {
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
    var core_1, http_1, router_1, app_registration_model_1, Registration;
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
            function (_2) {
            },
            function (app_registration_model_1_1) {
                app_registration_model_1 = app_registration_model_1_1;
            }
        ],
        execute: function () {
            Registration = (function () {
                function Registration(http, router) {
                    this.http = http;
                    this.router = router;
                    this.formUrl = 'register.do';
                    this.registrationModel = new app_registration_model_1.RegistrationModel();
                }
                Registration.prototype.submit = function (values) {
                    if (values.password !== values.confirmpassword) {
                        alert("Confirm password not matching");
                        return;
                    }
                    this.http
                        .post(this.formUrl, values)
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
                Registration.prototype.backToHome = function () {
                    this.router.navigate(['/home']);
                };
                Registration = __decorate([
                    core_1.Component({
                        templateUrl: './app/components/registration/registration.html'
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
                ], Registration);
                return Registration;
                var _a, _b;
            }());
            exports_1("Registration", Registration);
        }
    };
});
//# sourceMappingURL=app.registration.js.map
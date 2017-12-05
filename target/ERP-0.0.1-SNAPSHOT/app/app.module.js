System.register(["@angular/core", "@angular/platform-browser", "@angular/router", "@angular/http", "@angular/forms", "@angular/common", "./app.routes", "./guards/app.authguard", "./common/services/app.authenticateservice", "./app.component", "./components/home/app.home", "./components/registration/app.registration", "./components/books/app.listbooks", "./components/books/app.ratebook", "./common/shared_components/app.starrating"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_browser_1, router_1, http_1, forms_1, common_1, app_routes_1, app_authguard_1, app_authenticateservice_1, app_component_1, app_home_1, app_registration_1, app_listbooks_1, app_ratebook_1, app_starrating_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            },
            function (app_authguard_1_1) {
                app_authguard_1 = app_authguard_1_1;
            },
            function (app_authenticateservice_1_1) {
                app_authenticateservice_1 = app_authenticateservice_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (app_home_1_1) {
                app_home_1 = app_home_1_1;
            },
            function (app_registration_1_1) {
                app_registration_1 = app_registration_1_1;
            },
            function (app_listbooks_1_1) {
                app_listbooks_1 = app_listbooks_1_1;
            },
            function (app_ratebook_1_1) {
                app_ratebook_1 = app_ratebook_1_1;
            },
            function (app_starrating_1_1) {
                app_starrating_1 = app_starrating_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule,
                            router_1.RouterModule.forRoot(app_routes_1.routes, {
                                useHash: true
                            })
                        ],
                        declarations: [app_component_1.AppComponent, app_home_1.Home, app_registration_1.Registration, app_listbooks_1.ListBooks,
                            app_ratebook_1.RateBooks, app_starrating_1.StarRating],
                        bootstrap: [app_component_1.AppComponent],
                        providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, app_authguard_1.AuthGuard, app_authenticateservice_1.AuthenticateService]
                    })
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    };
});
//# sourceMappingURL=app.module.js.map
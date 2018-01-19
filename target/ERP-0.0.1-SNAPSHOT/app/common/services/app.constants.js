System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AppConstants;
    return {
        setters: [],
        execute: function () {
            AppConstants = /** @class */ (function () {
                function AppConstants() {
                }
                AppConstants.IS_AUTHENTICATED = 'IS_AUTHENTICATED';
                AppConstants.RESPONSE_STATUS = 'RESPONSE_STATUS';
                AppConstants.RESPONSE_MESSAGE = 'RESPONSE_MESSAGE';
                AppConstants.RESPONSE_DATA = 'RESPONSE_DATA';
                AppConstants.RESPONSE_ERROR_CODE = 'RESPONSE_ERROR_CODE';
                AppConstants.RESPONSE_DATA_COUNT = "RESPONSE_DATA_COUNT";
                AppConstants.RESPONSE_STATUS_SUCCESS = 'SUCCESS';
                AppConstants.RESPONSE_STATUS_FAILURE = 'FAILURE';
                AppConstants.RESPONSE_STATUS_ERROR = 'ERROR';
                AppConstants.SYSTEMCONSTANTS_ACCOUNT_GROUP_TYPE = 'Account_Group_Type';
                return AppConstants;
            }());
            exports_1("AppConstants", AppConstants);
        }
    };
});
//# sourceMappingURL=app.constants.js.map
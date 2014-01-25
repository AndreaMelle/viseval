'use strict';

//Global service for global variables
angular.module('adminApp.system').factory('Global', [
    function() {
        var _this = this;

        _this._data = {
            admin: window.admin,
            authenticated: !! window.admin
        };

        return _this._data;
    }
]);

angular.module('testApp.system').factory('Global', [

    function() {
        var _this = this;

        _this._data = {
            participant: window.participant,
            authenticated: !! window.participant
        };

        return _this._data;
    }
]);
